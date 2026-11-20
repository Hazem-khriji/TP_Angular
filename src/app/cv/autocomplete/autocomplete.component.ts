import { Component, inject } from "@angular/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
} from "rxjs";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);

  get search(): AbstractControl {
    return this.form.get("search")!;
  }

  form = this.formBuilder.group({ search: [""] });

  cvs$: Observable<Cv[]>;
  selectedCv$: Observable<Cv>;

  constructor() {
    this.cvs$ = this.search.valueChanges.pipe(
      map((value: string) => value.trim()),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name) =>
        name
          ? this.cvService.selectByName(name).pipe(
              catchError(() => of([] as Cv[])),
            )
          : of([] as Cv[]),
      ),
    );
    this.selectedCv$ = this.cvService.selectCv$;
  }

  selectCv(cv: Cv): void {
    this.cvService.selectCv(cv);
  }
}
