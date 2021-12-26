import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlogIndexComponent } from 'src/app/pages/list/components/blog-index/blog-index.component';
import { TagComponent } from 'src/app/pages/list/components/tag/tag.component';
import { ListRoutingModule } from 'src/app/pages/list/list-routing.module';
import { ListComponent } from 'src/app/pages/list/list.component';
import { IconModule } from 'src/app/shared/icons/icon.module';

const components = [BlogIndexComponent, ListComponent, TagComponent];

@NgModule({
  imports: [CommonModule, ListRoutingModule, IconModule],
  declarations: components,
})
export class ListModule {}
