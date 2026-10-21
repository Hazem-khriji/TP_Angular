import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { RainbowDirective } from './rainbow.directive';
import { TestFormComponent } from './components/test-form/test-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NavbarComponent, RouterOutlet, RainbowDirective, TestFormComponent],
})
export class AppComponent {
  title = 'Starting Advanced Topics';
}
