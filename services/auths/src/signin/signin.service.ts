import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { SignInrDto } from './dto';

@Injectable()
export class SigninService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInrDto) {
    const user = await this.databaseService.user.findUnique({
      where: { email: signInDto.email },
    });
    if (!user) throw new BadRequestException(['Bad credentials']);

    const isMatch = await bcrypt.compare(signInDto.password, user.password);
    if (!isMatch) throw new BadRequestException(['Bad credentials']);

    const token = await this.jwtService.signAsync({
      id: user.id,
      role: user.user_role,
    });
    await this.databaseService.session.create({
      data: {
        token,
        userId: user.id,
      },
    });

    return { message: 'Sign in successful', token };
  }
}
