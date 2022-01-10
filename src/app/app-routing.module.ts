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
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
