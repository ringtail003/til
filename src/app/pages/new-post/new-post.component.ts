import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/pages/new-post/models/blog-post';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
})
export class NewPostComponent implements OnInit {
  blogPost!: BlogPost;

  ngOnInit(): void {
    this.blogPost = new BlogPost();
  }

  onChangeTitle($event: string): void {
    this.blogPost.title = $event;
  }

  onChangeBody($event: string): void {
    this.blogPost.body = $event;
  }

  onCreatePrButtonClick(): void {
    // TODO:
  }
}
