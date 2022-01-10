import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPostsComponent } from 'src/app/pages/all-posts/all-posts.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AllPostsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllPostsRoutingModule {}
