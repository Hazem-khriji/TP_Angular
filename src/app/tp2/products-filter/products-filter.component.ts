import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PRODUCTS } from './product.data';

@Component({
  selector: 'app-products-filter',
  imports: [FormsModule],
  templateUrl: './products-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './products-filter.component.css',
})
export class ProductsFilterComponent {
  readonly products = PRODUCTS;
  protected categories = [...new Set(this.products.map((p) => p.category))];

  protected search = signal('');
  protected category = signal('');

  protected filteredProducts = computed(() => {
    const search = this.search().trim().toLowerCase();
    const category = this.category();
    return this.products.filter(
      (product) =>
        (!category || product.category === category) &&
        product.name.toLowerCase().includes(search),
    );
  });

  protected reset() {
    this.search.set('');
    this.category.set('');
  }
}
