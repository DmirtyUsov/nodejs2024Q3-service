import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto, UpdatePasswordDto, UserModel } from './dto';
import { DatabaseService } from 'src/database/database.service';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
  private saltRounds: number;
  constructor(
    private readonly databaseService: DatabaseService,
    private config: ConfigService,
  ) {
    this.saltRounds = +this.config.get<number>('CRYPT_SALT');
  }

  async findAll(): Promise<UserModel[]> {
    return await this.databaseService.extended.user.findMany();
  }

  async findOne(id: string): Promise<UserModel> {
    const userDto = await this.databaseService.extended.user.findUnique({
      where: { id },
    });
    if (!userDto) {
      throw new NotFoundException();
    }
    return new UserModel(userDto);
  }

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const { password, login } = createUserDto;
    const hash = await this.getPasswordHash(password);

    const result = await this.databaseService.extended.user.create({
      data: { login, password: hash },
    });

    if (!result) {
      throw new ForbiddenException();
    }
    return new UserModel(result);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserModel> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user: UserModel = await this.databaseService.extended.user.findUnique(
      {
        where: { id },
      },
    );

    if (!user) {
      throw new NotFoundException();
    }
    const isSameHash = await compare(oldPassword, user.password);

    if (!isSameHash) {
      throw new ForbiddenException();
    }

    user.password = await this.getPasswordHash(newPassword);

    const result = await this.databaseService.extended.user.update({
      where: { id },
      data: { password: user.password, version: { increment: 1 } },
    });
    return new UserModel(result);
  }

  async delete(id: string): Promise<UserModel> {
    try {
      const user = await this.databaseService.extended.user.delete({
        where: { id },
      });
      return new UserModel(user);
    } catch (error) {
      DatabaseService.handleError(error);
    }
  }

  private async getPasswordHash(password: string): Promise<string> {
    const salt = await genSalt(this.saltRounds);
    const passwordHash = await hash(password, salt);
    return passwordHash;
  }
}
