import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-master-products',
  imports: [RouterLink],
  templateUrl: './master-products.html',
  styleUrl: './master-products.css',
})
export class MasterProducts {
  productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  deleteProduct(id: number): void {
    this.productService.delete(id);
  }
}
