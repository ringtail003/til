import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  preserveWhitespaces: true, // TODO: これなに
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogPostComponent implements OnInit {
  ngOnInit() {}

  constructor() {}
}
