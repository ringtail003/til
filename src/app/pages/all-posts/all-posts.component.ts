import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { BlogPost } from 'src/app/pages/all-posts/models/blog-post';
import { FetchBlogPostUsecase } from 'src/app/pages/all-posts/usecases/fetch-blog-posts.usecase';

@Component({
  selector: 'all-posts',
  templateUrl: './all-posts.component.html',
})
export class AllPostsComponent implements OnInit {
  blogPosts$ = new ReplaySubject<BlogPost[]>(1);

  constructor(private fetchBlogPostUsecase: FetchBlogPostUsecase) {}

  ngOnInit(): void {
    this.fetchBlogPostUsecase.exec().subscribe((blogPosts) => {
      this.blogPosts$.next(blogPosts);
    });
  }
}
