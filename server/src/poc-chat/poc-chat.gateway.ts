import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { PocChatService } from './poc-chat.service';
import { CreatePocChatDto } from './dto/create-poc-chat.dto';
import { Server, Socket } from 'socket.io';
import { Request, UseGuards } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { WsCookieGuard } from '../acccount-manager/guards/ws-cookie-auth.guard';
import { TransactionsService } from '../transactions/transactions.service';
import { MessagesService } from '../messages/messages.service';
import { UsersService } from '../acccount-manager/user.service';
dotenv.config({ path: __dirname + '/../../.env' });

@WebSocketGateway(3002, {
  cors: { origin: process.env.SOCKET_CORS_ORIGIN, methods: ['GET', 'POST'], credentials: true },
})
export class PocChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly pocChatService: PocChatService,
    private transactionsService: TransactionsService,
    private messagesService: MessagesService,
    private usersService: UsersService,
  ) {}

  // @UseGuards(WsCookieGuard)
  @SubscribeMessage('createPocChat')
  async create(
    @MessageBody() createPocChatDto: CreatePocChatDto,
    @ConnectedSocket() client: Socket,
    @Request() req: Request,
  ) {
    const messages = await this.pocChatService.create({
      ...createPocChatDto,
      name: req['user'].firstName,
    });
    this.server.emit('message', messages);
  }

  // @UseGuards(WsCookieGuard)
  // @SubscribeMessage('findAllPocChat')
  // findAll() {
  //   return this.pocChatService.findAll();
  // }

  @SubscribeMessage('join')
  @UseGuards(WsCookieGuard)
  joinRoom(
    @MessageBody('transactionId') transactionId: number,
    @MessageBody('orgId') org_id: number,
    @ConnectedSocket() client: Socket,
    @Request() request: Request,
  ) {
    const user = request['user'];
    const isValid = this._can_user_join(user, transactionId, org_id);
    if (isValid) {
      client.join(`${transactionId}`);
      return { event: 'join', data: { success: true } } as WsResponse;
    } else {
      return { event: 'join', data: { success: false } } as WsResponse;
    }
  }

  @UseGuards(WsCookieGuard)
  @SubscribeMessage('message')
  async sendMessage(
    @MessageBody('text') text: string,
    @MessageBody('transactionId') transactionId: number,
    @ConnectedSocket() client: Socket,
    @Request() request: Request,
  ) {
    if (client.rooms.has(`${transactionId}`)) {
      const message = await this._createMessage(request['user'], transactionId, text);
      this.server.to(`${transactionId}`).emit(`message_${transactionId}`, message);
    }
  }

  @SubscribeMessage('typing')
  @UseGuards(WsCookieGuard)
  typing(
    @MessageBody('isTyping') isTyping: boolean,
    @MessageBody('transactionId') transactionId: number,
    @ConnectedSocket() client: Socket,
    @Request() req: Request,
  ) {
    const name =
      req['user'].organizations.length > 0
        ? req['user'].organizations[0].organization.name
        : req['user'].firstName;

    if (client.rooms.has(`${transactionId}`)) {
      client.to(`${transactionId}`).emit('typing', { name: name, isTyping });
    }
  }

  async _createMessage(user, transaction_id, text) {
    const transaction = await this.transactionsService.getTransactionWithRelations(transaction_id, {
      claimer: true,
      donater_organization: true,
    });
    const sending_user = user;
    const from_claimer =
      user.organizations &&
      user.organizations.find((org) => org.organizationId === transaction.claimerId);
    const sending_org =
      (from_claimer ? transaction.claimer : transaction.donater_organization) || null;
    const receiving_org = !from_claimer && transaction.donater_organization;
    const message = await this.messagesService.create({
      text,
      transaction,
      sending_org,
      sending_user,
      read: false,
    });
    if (receiving_org) { 
      // TODO: create seen message record
    }
    return message;
  }

  async _can_user_join(user, transaction_id, org_id = null) {
    const transaction = await this.transactionsService.getTransactionById(transaction_id);
    if (!transaction) {
      return false;
    }
    if (org_id) {
      if (!user.organizations.find((org) => org.organizationId === org_id)) {
        // user id does not match org_id so return false
        return false;
      }
      if (org_id !== transaction.donaterOrganizationId && org_id !== transaction.claimerId) {
        return false;
      }
    } else if (user.id !== transaction_id.donater_userId) {
      return false;
    }
    return true;
  }
}
