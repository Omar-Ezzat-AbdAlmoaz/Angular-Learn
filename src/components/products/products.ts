import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
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

  protected products = computed(() => this.productService.getAll());
  protected sortState = signal<SortState>(null);
  protected selectedIds = signal<Set<number>>(new Set());
  protected purchasedIds = signal<Set<number>>(new Set());
  protected totalPrice = signal(0);

  protected sortedProducts = computed(() => {
    const state = this.sortState();
    const list = [...this.products()];
    if (!state) {
      return list;
    }
    return list.sort((a, b) => {
      const diff = a[state.key] - b[state.key];
      return state.dir === 'asc' ? diff : -diff;
    });
  });

  protected selectedCount = computed(() => this.selectedIds().size);

  protected sortLabel(key: SortKey): string {
    const state = this.sortState();
    if (!state || state.key !== key) {
      return `Sort by ${key}`;
    }
    const arrow = state.dir === 'asc' ? '↑' : '↓';
    return `${key.charAt(0).toUpperCase() + key.slice(1)} ${arrow}`;
  }

  protected toggleSort(key: SortKey): void {
    const current = this.sortState();
    if (!current || current.key !== key) {
      this.sortState.set({ key, dir: 'asc' });
    } else if (current.dir === 'asc') {
      this.sortState.set({ key, dir: 'desc' });
    } else {
      this.sortState.set(null);
    }
  }

  protected toggleSelection(id: number): void {
    const updated = new Set(this.selectedIds());
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    this.selectedIds.set(updated);
  }

  protected onBuy(product: Product): void {
    if (product.stock === 0) {
      return;
    }
    const purchased = this.purchasedIds();
    if (purchased.has(product.id)) {
      return;
    }
    const updated = new Set(purchased);
    updated.add(product.id);
    this.purchasedIds.set(updated);
    this.totalPrice.update((p) => p + product.price);
  }
}
