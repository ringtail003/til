import { Component, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { BlogIndex } from 'src/app/pages/recent-posts/models/blog-index';
import { Tag } from 'src/app/pages/recent-posts/models/tag';
import { TagSelector } from 'src/app/pages/recent-posts/services/tag-selector';
import { FetchBlogIndexUsecase } from 'src/app/pages/recent-posts/usecases/fetch-blog-index.usecase';
import { FetchTagUsecase } from 'src/app/pages/recent-posts/usecases/fetch-tag.usecase';

@Component({
  selector: 'recent-posts',
  templateUrl: './recent-posts.component.html',
  providers: [{ provide: TagSelector }],
})
export class RecentPostsComponent implements OnInit {
  blogIndexes$ = new Subject<BlogIndex[]>();
  tags$ = new Subject<Tag[]>();

  constructor(
    private fetchBlogIndexUsecase: FetchBlogIndexUsecase,
    private fetchTagUsecase: FetchTagUsecase,
    private tagSelector: TagSelector
  ) {}

  ngOnInit() {
    combineLatest([
      this.fetchBlogIndexUsecase.exec(),
      this.fetchTagUsecase.exec(),
    ]).subscribe(([blogIndexes, tags]) => {
      this.blogIndexes$.next(blogIndexes);
      this.tags$.next(tags);
      this.tagSelector.tags = tags;

      this.tagSelector.watch().subscribe((tags) => {
        this.blogIndexes$.next(
          blogIndexes.filter((blogIndex) =>
            blogIndex.some(
              tags.filter((tag) => tag.isSelected).map((tag) => tag.label)
            )
          )
        );

        this.tags$.next(tags);
      });
    });
  }
}
