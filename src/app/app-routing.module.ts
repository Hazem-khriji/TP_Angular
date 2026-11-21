import { Injectable, NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { FrontComponent } from "./templates/front/front.component";
import { AdminComponent } from "./templates/admin/admin.component";
import { LoginComponent } from "./auth/login/login.component";
import { NF404Component } from "./components/nf404/nf404.component";
import { AuthGuard } from "./auth/guards/auth.guard";
import { Observable, of } from "rxjs";
import { PreloadingStrategy } from "@angular/router";

@Injectable({ providedIn: "root" })
export class CvPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    return route.data?.["preload"] ? load() : of(null);
  }
}

const routes: Route[] = [
  { path: "login", component: LoginComponent },
  {
    path: "cv",
    loadComponent: () =>
      import("./cv/cv/cv.component").then((component) => component.CvComponent),
    data: { preload: true },
  },
  {
    path: "cv/add",
    loadComponent: () =>
      import("./cv/add-cv/add-cv.component").then(
        (component) => component.AddCvComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "cv/:id",
    loadComponent: () =>
      import("./cv/details-cv/details-cv.component").then(
        (component) => component.DetailsCvComponent,
      ),
  },
  {
    path: "rh",
    loadComponent: () =>
      import("./optimizationPattern/rh/rh.component").then(
        (component) => component.RhComponent,
      ),
  },
  {
    path: "",
    component: FrontComponent,
    children: [
      {
        path: "todo",
        loadComponent: () =>
          import("./todo/todo/todo.component").then(
            (component) => component.TodoComponent,
          ),
      },
      {
        path: "word",
        loadComponent: () =>
          import("./directives/mini-word/mini-word.component").then(
            (component) => component.MiniWordComponent,
          ),
      },
      {
        path: "ttc",
        loadComponent: () =>
          import("./components/ttc/ttc.component").then(
            (component) => component.TtcComponent,
          ),
      },
      {
        path: "currency",
        loadComponent: () =>
          import("./tp2/currency-selector/country-currency-selector.component").then(
            (component) => component.CountryCurrencySelectorComponent,
          ),
      },
      {
        path: "products-filter",
        loadComponent: () =>
          import("./tp2/products-filter/products-filter.component").then(
            (component) => component.ProductsFilterComponent,
          ),
      },
      {
        path: "autocomplete",
        loadComponent: () =>
          import("./cv/autocomplete/autocomplete.component").then(
            (component) => component.AutocompleteComponent,
          ),
        data: { preload: true },
      },
    ],
  },
  {
    path: "admin",
    loadComponent: () =>
      import("./templates/admin/admin.component").then(
        (component) => component.AdminComponent,
      ),
    children: [
      {
        path: "color",
        loadComponent: () =>
          import("./components/color/color.component").then(
            (component) => component.ColorComponent,
          ),
      },
    ],
  },
  { path: "**", component: NF404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CvPreloadingStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
