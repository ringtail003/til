import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/pages/new-post/models/blog-post';
import * as Rx from 'rxjs';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
})
export class NewPostComponent implements OnInit {
  blogPost!: BlogPost;
  body$ = new Rx.Subject<string>();

  ngOnInit(): void {
    this.blogPost = new BlogPost();

    this.body$.pipe(Rx.debounceTime(500)).subscribe((value) => {
      this.blogPost.body = value;
    });
  }

  onChangeTitle($event: string): void {
    this.blogPost.title = $event;
  }

  onChangeBody($event: string): void {
    this.body$.next($event);
  }

  onCreatePrButtonClick(): void {
    // TODO:
  }
}
