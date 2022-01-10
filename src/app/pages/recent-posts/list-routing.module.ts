import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentPostsComponent } from 'src/app/pages/recent-posts/recent-posts.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RecentPostsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRoutingModule {}
