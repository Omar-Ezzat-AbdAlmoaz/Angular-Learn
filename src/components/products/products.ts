import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products {
  private productService = inject(ProductService);

  // Signal-based state management — all UI state lives in signals
  protected readonly sortState = signal<SortState>(null);
  protected readonly selectedIds = signal<Set<number>>(new Set());
  protected readonly purchasedIds = signal<Set<number>>(new Set());

  // Base product list (loaded once from service)
  protected readonly products = signal<Product[]>(this.productService.getAll());

  // Derived state: sorted products react to sortState changes
  protected readonly sortedProducts = computed(() => {
    const sort = this.sortState();
    const list = this.products();
    if (!sort) return [...list];

    const { key, dir } = sort;
    return [...list].sort((a, b) => {
      const diff = a[key] - b[key];
      return dir === 'asc' ? diff : -diff;
    });
  });

  // Derived state: selected count
  protected readonly selectedCount = computed(() => this.selectedIds().size);

  // Derived state: total price of purchased items
  protected readonly totalPrice = computed(() => {
    const purchased = this.purchasedIds();
    return this.products()
      .filter((p) => purchased.has(p.id))
      .reduce((sum, p) => sum + p.price, 0);
  });

  sortLabel(key: SortKey): string {
    const sort = this.sortState();
    if (!sort || sort.key !== key) {
      return `Sort by ${key}`;
    }
    const arrow = sort.dir === 'asc' ? '\u2191' : '\u2193';
    return `${key.charAt(0).toUpperCase() + key.slice(1)} ${arrow}`;
  }

  toggleSort(key: SortKey): void {
    const current = this.sortState();
    if (!current || current.key !== key) {
      this.sortState.set({ key, dir: 'asc' });
    } else if (current.dir === 'asc') {
      this.sortState.set({ key, dir: 'desc' });
    } else {
      this.sortState.set(null);
    }
  }

  toggleSelection(id: number): void {
    this.selectedIds.update((ids) => {
      const next = new Set(ids);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  onBuy(product: Product): void {
    if (product.stock === 0) return;
    if (this.purchasedIds().has(product.id)) return;

    this.purchasedIds.update((ids) => {
      const next = new Set(ids);
      next.add(product.id);
      return next;
    });
  }
}
