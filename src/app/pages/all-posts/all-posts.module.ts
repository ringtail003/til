import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AllPostsRoutingModule } from 'src/app/pages/all-posts/all-posts-routing.module';
import { AllPostsComponent } from 'src/app/pages/all-posts/all-posts.component';
import { HeadingComponent } from 'src/app/pages/all-posts/components/heading/heading.component';
import { IconModule } from 'src/app/shared/icons/icon.module';
import { BlogPostComponent } from './components/blog-post/blog-post.component';

const declarations = [AllPostsComponent, HeadingComponent, BlogPostComponent];

@NgModule({
  imports: [RouterModule, CommonModule, AllPostsRoutingModule, IconModule],
  declarations,
})
export class AllPostsModule {}
