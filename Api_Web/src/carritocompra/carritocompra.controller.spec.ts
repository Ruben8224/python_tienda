import { Test, TestingModule } from '@nestjs/testing';
import { CarritocompraController } from './carritocompra.controller';
import { CarritocompraService } from './carritocompra.service';

describe('CarritocompraController', () => {
  let controller: CarritocompraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarritocompraController],
      providers: [CarritocompraService],
    }).compile();

    controller = module.get<CarritocompraController>(CarritocompraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
