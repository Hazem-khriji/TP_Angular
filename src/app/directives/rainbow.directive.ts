import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
})
export class RainbowDirective {

@HostBinding('style.color') textColor = '';
@HostBinding('style.borderColor') borderColor = '';

 @HostListener('keyup')
 onKeyUp() {
    const color = this.randomHexColor();
    this.textColor = color;
    this.borderColor = color;
 }

 private randomHexColor(): string {
    return (
      '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')
    )
  }
}
