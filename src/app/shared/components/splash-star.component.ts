import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  template: `<star-icon
    [@blink]="state"
    class="w-2 text-yellow-200"
  ></star-icon>`,
  animations: [
    trigger('blink', [
      state(
        'light',
        style({
          opacity: 1,
        })
      ),
      state(
        'dark',
        style({
          opacity: 0.1,
          transform: 'scale(.7)',
        })
      ),
      transition('light => dark', [animate('3s')]),
      transition('dark => light', [animate('4s')]),
    ]),
  ],
})
export class SplashStarComponent implements OnInit {
  margin = 100;
  state: 'light' | 'dark' = 'light';

  constructor(private elementRef: ElementRef) {}

  get container(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    ['absolute', 'flex'].forEach((value) =>
      this.container.classList.add(value)
    );

    const position = this.createRandomPosition();

    this.container.style.left = `${position.left}px`;
    this.container.style.top = `${position.top}px`;

    this.blink();
  }

  private blink(): void {
    setTimeout(() => {
      this.state = this.state === 'light' ? 'dark' : 'light';
      this.blink();
    }, this.createRandomInt(3000, 10000));
  }

  private createRandomPosition(): { left: number; top: number } {
    const left = this.createRandomInt(
      this.margin,
      screen.availWidth - this.margin
    );

    const top = this.createRandomInt(
      this.margin,
      screen.availHeight - this.margin
    );

    return { left, top };
  }

  private createRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
