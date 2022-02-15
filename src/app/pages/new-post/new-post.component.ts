import { Component, OnInit } from '@angular/core';
import * as Rx from 'rxjs';
import { BlogPost } from 'src/app/pages/new-post/models/blog-post';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
})
export class NewPostComponent implements OnInit {
  patch$ = new Rx.Subject<Partial<BlogPost>>();
  blogPost = new BlogPost();

  ngOnInit(): void {
    this.patch$.pipe(Rx.debounceTime(500)).subscribe((value) => {
      value.title && (this.blogPost.title = value.title);
      value.body && (this.blogPost.body = value.body);
    });
  }

  onChangeTitle($event: string): void {
    this.patch$.next({ title: $event });
  }

  onChangeBody($event: string): void {
    this.patch$.next({ body: $event });
  }

  onCreatePrButtonClick(): void {
    // TODO:
  }
}
