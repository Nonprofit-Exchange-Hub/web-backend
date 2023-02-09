import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { User } from './entities/user.entity';
import { AccountManagerService } from './account-manager.service';
import { AccountManagerController } from './account-manager.controller';
import { CookieStrategy } from './strategies/cookie.strategy';
import { LoginStrategy } from './strategies/login.strategy';
import { WSCookieStrategy } from './strategies/ws-cookie.strategy';
import { UsersService } from './user.service';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { FilesStorageService } from '../file-storage/file-storage.service';
import {
  LocalStorageProvider,
  LOCAL_STORAGE_PROVIDER_TOKEN,
} from '../file-storage/storage-providers/local-storage';
import {
  AzureBlobStorage,
  AZURE_BLOB_PROVIDER_TOKEN,
} from '../file-storage/storage-providers/azure-blob-storage';

const providers = [
  AccountManagerService,
  UsersService,
  LoginStrategy,
  CookieStrategy,
  WSCookieStrategy,
  JwtService,
];

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User]),
    FileStorageModule,
  ],
  controllers: [AccountManagerController],
  providers: [
    ...providers,
    SendgridService,
    // change to LocalStorageProvider in development
    { provide: AZURE_BLOB_PROVIDER_TOKEN, useClass: AzureBlobStorage },
    FilesStorageService,
  ],
  exports: providers,
})
export class AcccountManagerModule {}
