import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/recent-posts/recent-posts.module').then(
        (m) => m.RecentPostsModule
      ),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./pages/all-posts/all-posts.module').then(
        (m) => m.AllPostsModule
      ),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./pages/blog-post/blog-post.module').then(
        (m) => m.BlogPostModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
