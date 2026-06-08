import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-master-products',
  imports: [RouterLink],
  templateUrl: './master-products.html',
  styleUrl: './master-products.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterProducts {
  protected productService = inject(ProductService);

  protected deleteProduct(id: number): void {
    this.productService.delete(id);
  }
}
