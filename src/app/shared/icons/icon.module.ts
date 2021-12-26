import { NgModule } from '@angular/core';
import { RightAllowSquareComponent } from 'src/app/shared/icons/right-allow-square/right-allow-square.component';

const components = [RightAllowSquareComponent];

@NgModule({
  declarations: components,
  exports: components,
})
export class IconModule {}
