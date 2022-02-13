import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogPost } from 'src/app/pages/new-post/models/blog-post';

@Component({
  selector: 'new-post-editor',
  templateUrl: './new-post-editor.component.html',
})
export class NewPostEditorComponent implements OnInit {
  @Input() blogPost!: BlogPost;

  @Output() onChangeTitle = new EventEmitter<string>();
  @Output() onChangeBody = new EventEmitter<string>();

  ngOnInit(): void {}
}
