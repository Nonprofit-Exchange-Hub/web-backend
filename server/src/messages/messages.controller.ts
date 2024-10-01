import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ReturnMessageDto } from './dto/return-message.dto';
import { DeleteResult } from 'typeorm';
import type { Request as ExpressRequest } from 'express';
import { CookieAuthGuard } from '../acccount-manager/guards/cookie-auth.guard';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(CookieAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a message.' })
  async create(
    @Request() request: ExpressRequest,
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<ReturnMessageDto> {
    const newMessage = await this.messagesService.create(createMessageDto);
    return newMessage;
  }

  @Get()
  @ApiOperation({ summary: 'Fetch messages.' })
  async findAll(): Promise<ReturnMessageDto[]> {
    return this.messagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch messages via ID.' })
  async findOne(@Param('id') id: string): Promise<ReturnMessageDto> {
    return this.messagesService.findOne(+id);
  }

  // add find by user and find by transaction

  @Patch(':id')
  @ApiOperation({ summary: 'Update a message.' })
  async update(
    @Param('id') id: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ): Promise<ReturnMessageDto> {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a message.' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.messagesService.remove(+id);
  }
}
