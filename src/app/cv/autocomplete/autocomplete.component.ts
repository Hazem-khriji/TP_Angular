import {
  Component,
  inject,
  ChangeDetectionStrategy,
  Signal,
} from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { NgFor } from "@angular/common";
import { FormBuilder, AbstractControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from "rxjs";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";
import { CvCardComponent } from "../cv-card/cv-card.component";

@Component({
    selector: "app-autocomplete",
    templateUrl: "./autocomplete.component.html",
    styleUrls: ["./autocomplete.component.css"],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, ReactiveFormsModule, NgFor, CvCardComponent]
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);

  get search(): AbstractControl {
    return this.form.get("search")!;
  }

  form = this.formBuilder.group({ search: [""] });

  matchingCvs: Signal<Cv[]>;
  selectedCv = this.cvService.selectedCv;

  constructor() {
    const search = toSignal(
      this.search.valueChanges.pipe(map((value: string) => value.trim())),
      { initialValue: "" },
    );

    this.matchingCvs = toSignal(
      toObservable(search).pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((name) =>
          name
            ? this.cvService.selectByName(name).pipe(
                catchError(() => of([] as Cv[])),
              )
            : of([] as Cv[]),
        ),
      ),
      { initialValue: [] as Cv[] },
    );
  }

  selectCv(cv: Cv): void {
    this.cvService.selectCv(cv);
  }
}
