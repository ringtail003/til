import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BlogPostRoutingModule } from './blog-post-routing.module';
import { BlogPostComponent } from './blog-post.component';

@NgModule({
  declarations: [BlogPostComponent],
  imports: [CommonModule, BlogPostRoutingModule, ScullyLibModule],
})
export class BlogPostModule {}
