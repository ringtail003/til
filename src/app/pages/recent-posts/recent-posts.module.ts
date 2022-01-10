import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlogPostComponent } from 'src/app/pages/recent-posts/components/blog-post/blog-post.component';
import { HeadingComponent } from 'src/app/pages/recent-posts/components/heading/heading.component';
import { TagComponent } from 'src/app/pages/recent-posts/components/tag/tag.component';
import { RecentPostsRoutingModule } from 'src/app/pages/recent-posts/recent-posts-routing.module';
import { RecentPostsComponent } from 'src/app/pages/recent-posts/recent-posts.component';
import { IconModule } from 'src/app/shared/icons/icon.module';

const components = [
  BlogPostComponent,
  RecentPostsComponent,
  TagComponent,
  HeadingComponent,
];

@NgModule({
  imports: [CommonModule, RecentPostsRoutingModule, IconModule],
  declarations: components,
})
export class RecentPostsModule {}
