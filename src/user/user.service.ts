import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto, UpdatePasswordDto, UserModel } from './dto';
import { createHash } from 'node:crypto';
import { DatabaseService } from 'src/database/database.service';

const ALGORITHM = 'sha256';
const ENCODING = 'hex';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

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
    const hash = createHash(ALGORITHM).update(password);

    const result = await this.databaseService.extended.user.create({
      data: { login, password: hash.digest(ENCODING) },
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

    const oldPasswordHash = createHash(ALGORITHM)
      .update(oldPassword)
      .digest(ENCODING);

    if (oldPasswordHash !== user.password) {
      throw new ForbiddenException();
    }

    user.password = createHash(ALGORITHM).update(newPassword).digest(ENCODING);

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
}
