import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlogIndexComponent } from 'src/app/pages/recent-posts/components/blog-index/blog-index.component';
import { HeadingComponent } from 'src/app/pages/recent-posts/components/heading/heading.component';
import { TagComponent } from 'src/app/pages/recent-posts/components/tag/tag.component';
import { ListRoutingModule } from 'src/app/pages/recent-posts/recent-posts-routing.module';
import { RecentPostsComponent } from 'src/app/pages/recent-posts/recent-posts.component';
import { IconModule } from 'src/app/shared/icons/icon.module';

const components = [
  BlogIndexComponent,
  RecentPostsComponent,
  TagComponent,
  HeadingComponent,
];

@NgModule({
  imports: [CommonModule, ListRoutingModule, IconModule],
  declarations: components,
})
export class RecentPostsModule {}
