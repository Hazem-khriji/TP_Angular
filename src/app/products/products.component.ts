import { Component } from "@angular/core";
import { Observable, Subject, concatMap, map, scan, startWith, takeWhile } from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";

const PAGE_SIZE = 12;

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
 
  private loadMore$ = new Subject<void>();

  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.loadMore$.pipe(
      startWith(undefined), 
      scan((skip) => skip + PAGE_SIZE, -PAGE_SIZE), 
      concatMap((skip) => this.productService.getProducts({ limit: PAGE_SIZE, skip })),
      takeWhile((response) => response.skip + response.limit < response.total, true),
      map((response) => response.products),
      scan((allProducts, page) => [...allProducts, ...page], [] as Product[]),
    );
  }

  loadMore() {
    this.loadMore$.next();
  }
}
