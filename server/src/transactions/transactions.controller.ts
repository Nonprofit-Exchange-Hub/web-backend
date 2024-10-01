import { Get, Post, Body, Query, Param, Patch, Delete, Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionsDto } from './dto/get-transactions-filter.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { CookieAuthGuard } from 'src/acccount-manager/guards/cookie-auth.guard';
import { ReturnTransactionDto } from './dto/return-transaction.dto';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a transaction.' })
  create(@Body() createTransactionDto: CreateTransactionDto): Promise<ReturnTransactionDto> {
    return this.transactionsService.createTransaction(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch transactions.' })
  get(@Query() getTransactionsDto: GetTransactionsDto): Promise<ReturnTransactionDto[]> {
    return this.transactionsService.getTransactions(getTransactionsDto);
  }

  @UseGuards(CookieAuthGuard)
  @Get('/inbox')
  // returns trasnactions with latest messages
  async userInbox(  @Request() req: Request): Promise<Transaction[]> {
    const user = req['user'];
    const userOrgs = await user.organizations;
    const org_id = userOrgs && userOrgs.length > 0 ? userOrgs[0].organizationId : false;
    if (org_id) {
      return this.transactionsService.find_by_org_with_latest_message(org_id);
    } else {
      return this.transactionsService.find_by_user_with_latest_message(user.id);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Fetch a transaction via ID.' })
  getTransactionById(@Param('id') id: number): Promise<ReturnTransactionDto> {
    return this.transactionsService.getTransactionById(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a transaction.' })
  update(
    @Param('id') id: number,
    @Body() updateTransactionStatusDto: UpdateTransactionDto,
  ): Promise<ReturnTransactionDto> {
    return this.transactionsService.updateTransaction(id, updateTransactionStatusDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a transaction.' })
  delete(@Param('id') id: number): Promise<void> {
    return this.transactionsService.deleteTransaction(id);
  }
}
