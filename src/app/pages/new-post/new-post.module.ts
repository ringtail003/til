import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreatePrButtonComponent } from 'src/app/pages/new-post/components/create-pr-button/create-pr-button.component';
import { NewPostEditorComponent } from 'src/app/pages/new-post/components/new-post-editor/new-post-editor.component';
import { SnippetButtonsComponent } from 'src/app/pages/new-post/components/new-post-editor/snippet-buttons/snippet-buttons.component';
import { NewPostViewerComponent } from 'src/app/pages/new-post/components/new-post-viewer/new-post-viewer.component';
import { NewPostRoutingModule } from 'src/app/pages/new-post/new-post-routing.module';
import { NewPostComponent } from 'src/app/pages/new-post/new-post.component';
import { IconModule } from 'src/app/shared/icons/icon.module';
import { SharedModule } from 'src/app/shared/shared.module';

const components = [
  NewPostComponent,
  NewPostEditorComponent,
  NewPostViewerComponent,
  CreatePrButtonComponent,
  SnippetButtonsComponent,
];

@NgModule({
  declarations: components,
  imports: [CommonModule, NewPostRoutingModule, SharedModule, IconModule],
})
export class NewPostModule {}
