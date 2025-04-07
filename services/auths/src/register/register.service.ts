import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDto } from './dto';

const saltOrRounds = 10;

@Injectable()
export class RegisterService {
  constructor(private readonly databaseService: DatabaseService) {}

  async isEmailOrUsernameTaken(registerDto: RegisterDto) {
    const user = await this.databaseService.user.findFirst({
      where: {
        OR: [{ username: registerDto.username }, { email: registerDto.email }],
      },
    });
    if (user)
      throw new BadRequestException(['username or email already taken']);
  }

  async createUser(registerDto: RegisterDto) {
    const hash = await bcrypt.hash(registerDto.password, saltOrRounds);

    const newUser = await this.databaseService.user.create({
      data: {
        ...registerDto,
        user_role: 'freeMember',
        password: hash,
      },
    });

    delete newUser.password;

    return newUser;
  }

  async register(registerDto: RegisterDto) {
    await this.isEmailOrUsernameTaken(registerDto);
    return await this.createUser(registerDto);
  }
}
