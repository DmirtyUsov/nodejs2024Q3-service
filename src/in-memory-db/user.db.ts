import { UserModel } from 'src/user/dto/index';
import { InMemoryDB } from './in-memory-db';

export class UserDB extends InMemoryDB<UserModel> {
  create(dto: UserModel): UserModel {
    this.add(dto.id, dto);
    return dto;
  }
}
