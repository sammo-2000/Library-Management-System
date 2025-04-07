import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { RegisterModule } from './register/register.module';
import { SigninModule } from './signin/signin.module';
import { AccountsModule } from './accounts/accounts.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [DatabaseModule, RegisterModule, SigninModule, AccountsModule, PermissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
