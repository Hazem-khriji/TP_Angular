import { Component } from "@angular/core";
import { BehaviorSubject, Observable, concatMap, map, scan, takeWhile } from "rxjs";
import { Product } from "./dto/product.dto";
import { Settings } from "./dto/product-settings.dto";
import { ProductService } from "./services/product.service";

const PAGE_SIZE = 12;

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  private settings$ = new BehaviorSubject<Settings>({ limit: PAGE_SIZE, skip: 0 });

  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.settings$.pipe(
      concatMap((settings) => this.productService.getProducts(settings)),
      takeWhile((response) => response.skip + response.limit < response.total, true),
      map((response) => response.products),
      scan((allProducts, page) => [...allProducts, ...page], [] as Product[]),
    );
  }

  loadMore() {
    const { limit, skip } = this.settings$.value;
    this.settings$.next({ limit, skip: skip + limit });
  }
}
