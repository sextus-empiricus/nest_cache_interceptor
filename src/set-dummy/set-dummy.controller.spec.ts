import { Test, TestingModule } from '@nestjs/testing';
import { SetDummyController } from './set-dummy.controller';

describe('SetDummyController', () => {
  let controller: SetDummyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetDummyController],
    }).compile();

    controller = module.get<SetDummyController>(SetDummyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
