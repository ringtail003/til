import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { HeadingComponent } from 'src/app/pages/blog-post/components/heading/heading.component';
import { IconModule } from 'src/app/shared/icons/icon.module';
import { BlogPostRoutingModule } from './blog-post-routing.module';
import { BlogPostComponent } from './blog-post.component';

const components = [BlogPostComponent, HeadingComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, BlogPostRoutingModule, ScullyLibModule, IconModule],
})
export class BlogPostModule {}
