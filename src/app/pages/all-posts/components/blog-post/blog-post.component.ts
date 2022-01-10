import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/pages/all-posts/models/blog-post';

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
})
export class BlogPostComponent implements OnInit {
  @Input() blogPost!: BlogPost;

  constructor() {}

  ngOnInit(): void {}
}
