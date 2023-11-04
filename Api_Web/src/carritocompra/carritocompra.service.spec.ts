import { Test, TestingModule } from '@nestjs/testing';
import { CarritocompraService } from './carritocompra.service';

describe('CarritocompraService', () => {
  let service: CarritocompraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarritocompraService],
    }).compile();

    service = module.get<CarritocompraService>(CarritocompraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
