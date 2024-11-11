import { Test, TestingModule } from '@nestjs/testing';
import { MyDBService } from './mydb.service';

describe('MydbService', () => {
  let service: MyDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyDBService],
    }).compile();

    service = module.get<MyDBService>(MyDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
