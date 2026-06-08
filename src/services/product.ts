import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product';
import { PRODUCTS } from '../data/products';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = signal<Product[]>([...PRODUCTS]);
  private nextId = signal(
    PRODUCTS.reduce((max, p) => Math.max(max, p.id), 0) + 1,
  );

  getAll(): Product[] {
    return this.products();
  }

  getById(id: number): Product | undefined {
    return this.products().find((p) => p.id === id);
  }

  add(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      ...product,
      id: this.nextId(),
    };
    this.products.update((list) => [...list, newProduct]);
    this.nextId.update((n) => n + 1);
    return newProduct;
  }

  update(product: Product): void {
    this.products.update((list) =>
      list.map((p) => (p.id === product.id ? product : p)),
    );
  }

  delete(id: number): void {
    this.products.update((list) => list.filter((p) => p.id !== id));
  }
}
