import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPostComponent } from 'src/app/pages/new-post/new-post.component';

const routes: Routes = [
  {
    path: '**',
    component: NewPostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPostRoutingModule {}
