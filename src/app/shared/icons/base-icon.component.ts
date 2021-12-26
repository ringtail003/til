import { Component, HostBinding, Input } from '@angular/core';

@Component({
  template: '',
})
export class BaseIconComponent {
  @Input() class?: string;

  @HostBinding('class') get getClass() {
    return this.class || '';
  }
}
