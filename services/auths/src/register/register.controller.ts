import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  register(@Body() registerDto: RegisterDto) {
    return this.registerService.register(registerDto);
  }
}
