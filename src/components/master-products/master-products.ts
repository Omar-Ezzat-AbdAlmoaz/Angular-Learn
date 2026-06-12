import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';

@Component({
  selector: 'app-master-products',
  imports: [RouterLink],
  templateUrl: './master-products.html',
  styleUrl: './master-products.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterProducts {
  private productService = inject(ProductService);

  // Signal holding the product list — updates after add/edit/delete
  protected readonly products = signal<Product[]>(this.productService.getAll());

  deleteProduct(id: number): void {
    this.productService.delete(id);
    // Re-read from service and update signal so the view refreshes
    this.products.set(this.productService.getAll());
  }
}
