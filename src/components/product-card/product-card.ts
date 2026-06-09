import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { TruncateWordsPipe } from '../../pipes/truncate-words';
import { ImageZoomDirective } from '../../directives/image-zoom';

@Component({
  selector: 'app-product-card',
  imports: [TruncateWordsPipe, ImageZoomDirective],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: Product;
  @Input() selected = false;
  @Input() bought = false;

  @Output() toggleSelection = new EventEmitter<number>();
  @Output() buy = new EventEmitter<Product>();

  showFull = false;

  isOutOfStock(): boolean {
    return this.product.stock === 0;
  }

  onCheckboxChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleSelection.emit(this.product.id);
    void checked;
  }

  onBuy(): void {
    if (this.isOutOfStock() || this.bought) {
      return;
    }
    this.buy.emit(this.product);
  }

  toggleDescription(): void {
    this.showFull = !this.showFull;
  }
}
