import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';
import { SignInrDto } from './dto';

@Injectable()
export class SigninService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async resetLoginAttempt(userId: number) {
    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new BadRequestException(['User not found']);

    await this.databaseService.user.update({
      where: { id: userId },
      data: {
        loginAttempt: 0,
        isLocked: false,
      },
    });
  }

  async signIn(signInDto: SignInrDto) {
    const user = await this.databaseService.user.findUnique({
      where: { email: signInDto.email },
    });
    if (!user) throw new BadRequestException(['Bad credentials']);

    // If the account was locked but the time passed, reset lock status and login attempts
    if (
      user.loginAttempt >= 3 &&
      user.updated_at.getTime() + 30 * 60 * 1000 < new Date().getTime()
    ) {
      await this.resetLoginAttempt(user.id);
    }

    // Check if the account is locked due to too many failed login attempts
    if (user.loginAttempt >= 3 && user.isLocked)
      throw new BadRequestException([
        'Account is locked due to too many failed login attempts',
      ]);

    const isMatch = await bcrypt.compare(signInDto.password, user.password);
    if (!isMatch) {
      await this.databaseService.user.update({
        where: { id: user.id },
        data: {
          loginAttempt: user.loginAttempt + 1,
          isLocked: user.loginAttempt + 1 >= 3,
        },
      });
      throw new BadRequestException([
        `Bad credentials - attempt ${user.loginAttempt + 1}`,
      ]);
    }

    await this.resetLoginAttempt(user.id);

    const jti = randomUUID();
    const token = await this.jwtService.signAsync(
      {
        jti,
        id: user.id,
        role: user.user_role,
      },
      {
        expiresIn: '24h',
      },
    );

    await this.databaseService.session.create({
      data: {
        jti,
        token,
        userId: user.id,
        verificationCode: '000000',
        // verificationCode: Math.floor(Math.random() * 1000000)
        //   .toString()
        //   .padStart(6, '0'),
      },
    });

    return { message: 'Sign in successful', token };
  }
}
