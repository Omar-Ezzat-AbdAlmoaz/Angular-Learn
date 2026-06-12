import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';
import { Product } from '../../models/product';
import { TruncateWordsPipe } from '../../pipes/truncate-words';
import { ImageZoomDirective } from '../../directives/image-zoom';

@Component({
  selector: 'app-product-card',
  imports: [TruncateWordsPipe, ImageZoomDirective],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  // Modern input/output functions replace @Input/@Output decorators
  product = input.required<Product>();
  selected = input(false);
  bought = input(false);

  toggleSelection = output<number>();
  buy = output<Product>();

  // Local UI state as a signal
  protected readonly showFull = signal(false);

  isOutOfStock(): boolean {
    return this.product().stock === 0;
  }

  onCheckboxChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleSelection.emit(this.product().id);
    void checked;
  }

  onBuy(): void {
    if (this.isOutOfStock() || this.bought()) {
      return;
    }
    this.buy.emit(this.product());
  }

  toggleDescription(): void {
    this.showFull.update((v) => !v);
  }
}
