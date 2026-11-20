import { Component, inject, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { catchError, of } from 'rxjs';
import { CvService } from '../services/cv.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-master-details-cv',
  templateUrl: './master-details-cv.component.html',
  styleUrl: './master-details-cv.component.css',
  imports: [ListComponent, RouterOutlet],
})
export class MasterDetailsCvComponent {
  private cvService = inject(CvService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  cvs = toSignal(
    this.cvService
      .getCvs()
      .pipe(catchError(() => of(this.cvService.getFakeCvs()))),
    { initialValue: [] }
  );

  constructor() {
    effect(() => {
      const cv = this.cvService.selectedCv();
      if (cv) {
        this.router.navigate([cv.id], { relativeTo: this.activatedRoute });
      }
    });
  }
}
