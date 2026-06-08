import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
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
  product = input.required<Product>();
  selected = input<boolean>(false);
  bought = input<boolean>(false);

  toggleSelection = output<number>();
  buy = output<Product>();

  protected showFull = signal(false);

  protected isOutOfStock(): boolean {
    return this.product().stock === 0;
  }

  protected onCheckboxChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleSelection.emit(this.product().id);
    void checked;
  }

  protected onBuy(): void {
    if (this.isOutOfStock() || this.bought()) {
      return;
    }
    this.buy.emit(this.product());
  }

  protected toggleDescription(): void {
    this.showFull.update((v) => !v);
  }
}
