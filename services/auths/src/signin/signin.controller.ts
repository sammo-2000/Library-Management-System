import { Body, Controller, Post } from '@nestjs/common';
import { SignInrDto } from './dto';
import { SigninService } from './signin.service';

@Controller('signin')
export class SigninController {
  constructor(private readonly signinService: SigninService) {}

  @Post()
  signIn(@Body() signInDto: SignInrDto) {
    return this.signinService.signIn(signInDto);
  }
}
