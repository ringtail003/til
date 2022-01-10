import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BlogPost } from 'src/app/pages/all-posts/models/blog-post';
import { FetchBlogPostUsecase } from 'src/app/pages/all-posts/usecases/fetch-blog-posts.usecase';

@Component({
  selector: 'all-posts',
  templateUrl: './all-posts.component.html',
})
export class AllPostsComponent implements OnInit {
  blogPosts$ = new Subject<BlogPost[]>();

  constructor(private fetchBlogPostUsecase: FetchBlogPostUsecase) {}

  ngOnInit() {
    console.log('hoge');
    this.fetchBlogPostUsecase.exec().subscribe((blogPosts) => {
      console.log(blogPosts);
      this.blogPosts$.next(blogPosts);
    });
  }
}
