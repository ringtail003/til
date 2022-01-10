import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogFooterComponent } from 'src/app/components/blog-footer/blog-footer.component';
import { BlogHeaderComponent } from 'src/app/components/blog-header/blog-header.component';
import { IconModule } from 'src/app/shared/icons/icon.module';

const components = [BlogHeaderComponent, BlogFooterComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [RouterModule, IconModule],
})
export class ComponentModule {}
