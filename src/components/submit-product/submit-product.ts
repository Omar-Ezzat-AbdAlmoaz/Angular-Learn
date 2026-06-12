import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-submit-product',
  imports: [FormsModule, RouterLink],
  templateUrl: './submit-product.html',
  styleUrl: './submit-product.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitProduct implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  // Signal-based state
  protected readonly isEdit = signal(false);
  protected readonly editId = signal<number | null>(null);
  protected readonly submitted = signal(false);

  // Form data as a mutable object (FormsModule requires mutable bindings)
  formData: Omit<Product, 'id'> & { id?: number } = {
    title: '',
    description: '',
    price: 0,
    stock: 0,
    thumbnail: '',
    category: '',
  };

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      const existing = this.productService.getById(id);
      if (existing) {
        this.isEdit.set(true);
        this.editId.set(id);
        this.formData = { ...existing };
      }
    }
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (!this.formData.title || !this.formData.price || this.formData.stock < 0) {
      return;
    }

    if (this.isEdit()) {
      this.productService.update({
        ...this.formData,
        id: this.editId()!,
      } as Product);
    } else {
      this.productService.add(this.formData);
    }

    this.router.navigate(['/master-products']);
  }
}
