import { Directive } from '@angular/core';

@Directive({
  selector: '[appCpf]'
})
export class CpfDirective {

  constructor() { }

  /*
  private regex: RegExp = new RegExp(/^\d{0,11}$/g);

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    if (!this.regex.test(value)) {
      value = value.slice(0, 11);
      input.value = value.replace(/[^0-9]/g, '');
    }

    this.el.nativeElement.value = input.value;
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.key < '0' || event.key > '9') {
      event.preventDefault();
    }
  }
  */

}
