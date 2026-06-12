import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  // Signal-based state for the product and not-found flag
  protected readonly product = signal<Product | undefined>(undefined);
  protected readonly notFound = signal(false);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.productService.getById(id);
    if (found) {
      this.product.set(found);
    } else {
      this.notFound.set(true);
    }
  }
}
