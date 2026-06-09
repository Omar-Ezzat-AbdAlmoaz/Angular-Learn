import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { ProductCard } from '../product-card/product-card';

type SortKey = 'price' | 'stock';
type SortDir = 'asc' | 'desc';
type SortState = { key: SortKey; dir: SortDir } | null;

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private productService: ProductService;

  products: Product[] = [];
  sortedProducts: Product[] = [];
  sortState: SortState = null;
  selectedIds: Set<number> = new Set();
  purchasedIds: Set<number> = new Set();
  selectedCount = 0;
  totalPrice = 0;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  ngOnInit(): void {
    this.products = this.productService.getAll();
    this.sortedProducts = [...this.products];
  }

  sortLabel(key: SortKey): string {
    if (!this.sortState || this.sortState.key !== key) {
      return `Sort by ${key}`;
    }
    const arrow = this.sortState.dir === 'asc' ? '\u2191' : '\u2193';
    return `${key.charAt(0).toUpperCase() + key.slice(1)} ${arrow}`;
  }

  toggleSort(key: SortKey): void {
    if (!this.sortState || this.sortState.key !== key) {
      this.sortState = { key, dir: 'asc' };
    } else if (this.sortState.dir === 'asc') {
      this.sortState = { key, dir: 'desc' };
    } else {
      this.sortState = null;
    }
    this.applySort();
  }

  private applySort(): void {
    if (!this.sortState) {
      this.sortedProducts = [...this.products];
      return;
    }
    const { key, dir } = this.sortState;
    this.sortedProducts = [...this.products].sort((a, b) => {
      const diff = a[key] - b[key];
      return dir === 'asc' ? diff : -diff;
    });
  }

  toggleSelection(id: number): void {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
    this.selectedCount = this.selectedIds.size;
  }

  onBuy(product: Product): void {
    if (product.stock === 0) {
      return;
    }
    if (this.purchasedIds.has(product.id)) {
      return;
    }
    this.purchasedIds = new Set(this.purchasedIds);
    this.purchasedIds.add(product.id);
    this.totalPrice += product.price;
  }
}
