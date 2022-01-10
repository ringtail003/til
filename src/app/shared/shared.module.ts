import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogFooterComponent } from 'src/app/shared/components/blog-footer/blog-footer.component';
import { BlogHeaderComponent } from 'src/app/shared/components/blog-header/blog-header.component';
import { SplashStarComponent } from 'src/app/shared/components/splash-star.component';
import { SplashStarDirective } from 'src/app/shared/directives/splash-star.directive';
import { IconModule } from 'src/app/shared/icons/icon.module';

const declarations = [
  SplashStarDirective,
  SplashStarComponent,
  BlogHeaderComponent,
  BlogFooterComponent,
];

@NgModule({
  imports: [RouterModule, IconModule],
  exports: declarations,
  declarations,
})
export class SharedModule {}
