import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-submit-product',
  imports: [FormsModule, RouterLink],
  templateUrl: './submit-product.html',
  styleUrl: './submit-product.css',
})
export class SubmitProduct implements OnInit {
  isEdit = false;
  editId: number | null = null;
  submitted = false;

  formData: Omit<Product, 'id'> & { id?: number } = {
    title: '',
    description: '',
    price: 0,
    stock: 0,
    thumbnail: '',
    category: '',
  };

  private route: ActivatedRoute;
  private router: Router;
  private productService: ProductService;

  constructor(
    route: ActivatedRoute,
    router: Router,
    productService: ProductService,
  ) {
    this.route = route;
    this.router = router;
    this.productService = productService;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      const existing = this.productService.getById(id);
      if (existing) {
        this.isEdit = true;
        this.editId = id;
        this.formData = { ...existing };
      }
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (!this.formData.title || !this.formData.price || this.formData.stock < 0) {
      return;
    }

    if (this.isEdit) {
      this.productService.update({
        ...this.formData,
        id: this.editId!,
      } as Product);
    } else {
      this.productService.add(this.formData);
    }

    this.router.navigate(['/master-products']);
  }
}
