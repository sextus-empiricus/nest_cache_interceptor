import { Test, TestingModule } from '@nestjs/testing';
import { SetDummyService } from './set-dummy.service';

describe('SetDummyService', () => {
  let service: SetDummyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetDummyService],
    }).compile();

    service = module.get<SetDummyService>(SetDummyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
