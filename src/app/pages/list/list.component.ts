import { Component, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { BlogIndex } from 'src/app/pages/list/models/blog-index';
import { Tag } from 'src/app/pages/list/models/tag';
import { FetchBlogIndexUsecase } from 'src/app/pages/list/usecases/fetch-blog-index.usecase';
import { FetchTagUsecase } from 'src/app/pages/list/usecases/fetch-tag.usecase';
import { TagSelector } from 'src/app/services/tag-selector';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  providers: [{ provide: TagSelector }],
})
export class ListComponent implements OnInit {
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
            blogIndex.some(tags.map((tag) => tag.label))
          )
        );

        this.tags$.next(tags);
      });
    });
  }
}
