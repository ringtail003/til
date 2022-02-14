import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { marked } from 'marked';
import { BlogPost } from 'src/app/pages/new-post/models/blog-post';

@Component({
  selector: 'new-post-viewer',
  templateUrl: './new-post-viewer.component.html',
})
export class NewPostViewerComponent implements OnInit, OnChanges {
  @Input() blogPost!: BlogPost;

  body!: string;

  ngOnInit(): void {}

  ngOnChanges(changes: { blogPost?: SimpleChange }): void {
    console.log(changes);

    console.log(marked.parse(changes.blogPost?.currentValue.body));
  }
}
