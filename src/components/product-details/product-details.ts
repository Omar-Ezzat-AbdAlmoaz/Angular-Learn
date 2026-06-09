import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product: Product | undefined = undefined;
  notFound = false;

  private route: ActivatedRoute;
  private productService: ProductService;

  constructor(route: ActivatedRoute, productService: ProductService) {
    this.route = route;
    this.productService = productService;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.productService.getById(id);
    if (found) {
      this.product = found;
    } else {
      this.notFound = true;
    }
  }
}
