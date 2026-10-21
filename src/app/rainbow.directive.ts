import { Directive, HostBinding, HostListener, signal } from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
})
export class RainbowDirective {
  private color = signal(this.randomHexColor());

  @HostBinding('style.color')
  get textColor(): string {
    return this.color();
  }

  @HostBinding('style.border-color')
  get borderColor(): string {
    return this.color();
  }

  @HostListener('keyup')
  onKeyUp(): void {
    this.color.set(this.randomHexColor());
  }

  private randomHexColor(): string {
    return (
      '#' +
      Math.floor(Math.random() * 0x1000000)
        .toString(16)
        .padStart(6, '0')
    );
  }
}
