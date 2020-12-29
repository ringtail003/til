import { NgModule } from '@angular/core';
import { ViewListIconComponent } from 'src/app/components/icons/view-list/view-list-icon.component';

const components = [ViewListIconComponent];

@NgModule({
  declarations: components,
  exports: components,
})
export class IconModule {}
