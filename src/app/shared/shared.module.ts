import { NgModule } from '@angular/core';
import { SplashStarComponent } from 'src/app/shared/components/splash-star.component';
import { SplashStarDirective } from 'src/app/shared/directives/splash-star.directive';
import { IconModule } from 'src/app/shared/icons/icon.module';

const declarations = [SplashStarDirective, SplashStarComponent];

@NgModule({
  imports: [IconModule],
  exports: declarations,
  declarations,
})
export class SharedModule {}
