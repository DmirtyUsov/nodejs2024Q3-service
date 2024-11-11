import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MyDBService } from 'src/mydb/mydb.service';
import { CreateUserDto, UpdatePasswordDto, UserModel } from './dto';
import { randomUUID } from 'crypto';
import { createHash } from 'node:crypto';

const ALGORITHM = 'sha256';
const ENCODING = 'hex';

@Injectable()
export class UserService {
  constructor(private readonly myDBService: MyDBService) {}

  findAll(): UserModel[] {
    return this.myDBService.user.list().map((user) => new UserModel(user));
  }

  findOne(id: string): UserModel {
    const userDto = this.myDBService.user.get(id);
    if (!userDto) {
      throw new NotFoundException();
    }
    return new UserModel(userDto);
  }

  create(createUserDto: CreateUserDto): UserModel {
    const { password, login } = createUserDto;
    const hash = createHash(ALGORITHM).update(password);

    const id = randomUUID();
    const moment = Date.now();

    const newUser: UserModel = new UserModel({
      id,
      password: hash.digest(ENCODING),
      login,
      createdAt: moment,
      updatedAt: moment,
      version: 1,
    });
    const result = this.myDBService.user.add(id, newUser);
    if (!result) {
      throw new ForbiddenException();
    }
    return newUser;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): UserModel {
    const { oldPassword, newPassword } = updatePasswordDto;
    const userDto: UserModel = this.myDBService.user.get(id);

    if (!userDto) {
      throw new NotFoundException();
    }

    const oldPasswordHash = createHash(ALGORITHM)
      .update(oldPassword)
      .digest(ENCODING);

    if (oldPasswordHash !== userDto.password) {
      throw new ForbiddenException();
    }
    const moment = Date.now();

    userDto.updatedAt = moment;
    userDto.version = userDto.version + 1;
    userDto.password = createHash(ALGORITHM)
      .update(newPassword)
      .digest(ENCODING);

    const result = this.myDBService.user.update(id, userDto);
    return new UserModel(result);
  }

  delete(id: string): UserModel {
    const userDto = this.myDBService.user.delete(id);
    if (!userDto) {
      throw new NotFoundException();
    }
    return new UserModel(userDto);
  }
}
