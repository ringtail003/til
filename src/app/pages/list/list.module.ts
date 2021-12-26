import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArticleComponent } from 'src/app/pages/list/components/article/article.component';
import { TagComponent } from 'src/app/pages/list/components/tag/tag.component';
import { ListRoutingModule } from 'src/app/pages/list/list-routing.module';
import { ListComponent } from 'src/app/pages/list/list.component';

const components = [ArticleComponent, ListComponent, TagComponent];

@NgModule({
  imports: [CommonModule, ListRoutingModule],
  declarations: components,
})
export class ListModule {}
