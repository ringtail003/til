import { Component, OnInit } from '@angular/core';
import { combineLatest, ReplaySubject } from 'rxjs';
import { BlogPost } from 'src/app/pages/recent-posts/models/blog-post';
import { Tag } from 'src/app/pages/recent-posts/models/tag';
import { TagSelector } from 'src/app/pages/recent-posts/services/tag-selector';
import { FetchBlogPostsUsecase } from 'src/app/pages/recent-posts/usecases/fetch-blog-posts.usecase';
import { FetchTagsUsecase } from 'src/app/pages/recent-posts/usecases/fetch-tags.usecase';

@Component({
  selector: 'recent-posts',
  templateUrl: './recent-posts.component.html',
  providers: [{ provide: TagSelector }],
})
export class RecentPostsComponent implements OnInit {
  blogPosts$ = new ReplaySubject<BlogPost[]>(1);
  tags$ = new ReplaySubject<Tag[]>();

  constructor(
    private fetchBlogPostsUsecase: FetchBlogPostsUsecase,
    private fetchTagUsecase: FetchTagsUsecase,
    private tagSelector: TagSelector
  ) {}

  ngOnInit() {
    combineLatest([
      this.fetchBlogPostsUsecase.exec(),
      this.fetchTagUsecase.exec(),
    ]).subscribe(([blogPosts, tags]) => {
      this.blogPosts$.next(blogPosts);
      this.tags$.next(tags);
      this.tagSelector.tags = tags;

      this.tagSelector.watch().subscribe((tags) => {
        this.blogPosts$.next(
          blogPosts.filter((blogPost) =>
            blogPost.some(
              tags.filter((tag) => tag.isSelected).map((tag) => tag.label)
            )
          )
        );

        this.tags$.next(tags);
      });
    });
  }
}
