import { TestBed } from '@angular/core/testing';

import { ProductService } from './product';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all products', () => {
    expect(service.getAll().length).toBeGreaterThan(0);
  });

  it('should get product by id', () => {
    const product = service.getById(1);
    expect(product).toBeTruthy();
    expect(product?.id).toBe(1);
  });

  it('should return undefined for invalid id', () => {
    const product = service.getById(9999);
    expect(product).toBeUndefined();
  });

  it('should add a product', () => {
    const initialLength = service.getAll().length;
    service.add({
      title: 'Test Product',
      description: 'Test description',
      price: 9.99,
      stock: 5,
      thumbnail: '',
      category: 'test',
    });
    expect(service.getAll().length).toBe(initialLength + 1);
  });

  it('should update a product', () => {
    const product = service.getById(1);
    expect(product).toBeTruthy();
    service.update({ ...product!, title: 'Updated Title' });
    const updated = service.getById(1);
    expect(updated?.title).toBe('Updated Title');
  });

  it('should delete a product', () => {
    const initialLength = service.getAll().length;
    service.delete(1);
    expect(service.getAll().length).toBe(initialLength - 1);
  });
});
