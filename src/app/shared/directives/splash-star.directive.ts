import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { SplashStarComponent } from 'src/app/shared/components/splash-star.component';

@Directive({
  selector: '[splashStar]',
})
export class SplashStarDirective implements OnInit {
  @Input() number = 30;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    const componentRefs = Array.from({ length: this.number }).map(() => {
      this.viewContainerRef.createComponent(SplashStarComponent);
    });
  }
}
