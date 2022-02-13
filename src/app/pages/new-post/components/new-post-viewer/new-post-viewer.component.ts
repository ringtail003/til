import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/pages/new-post/models/blog-post';

@Component({
  selector: 'new-post-viewer',
  templateUrl: './new-post-viewer.component.html',
})
export class NewPostViewerComponent implements OnInit {
  @Input() blogPost!: BlogPost;

  ngOnInit(): void {}
}
