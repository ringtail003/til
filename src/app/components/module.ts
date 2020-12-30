import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogFooterComponent } from 'src/app/components/blog-footer/blog-footer.component';
import { BlogHeaderComponent } from 'src/app/components/blog-header/blog-header.component';
import { IconsModule } from 'src/app/components/icons/module';

const components = [BlogHeaderComponent, BlogFooterComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [IconsModule, RouterModule],
})
export class ComponentModule {}
