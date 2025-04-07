import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.const';
import { DatabaseModule } from 'src/database/database.module';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.sercet,
    }),
  ],
  controllers: [SigninController],
  providers: [SigninService],
})
export class SigninModule {}
