import { Component, OnInit } from '@angular/core';
import * as Rx from 'rxjs';
import { BlogPost } from 'src/app/pages/new-post/models/blog-post';
import { Tag } from 'src/app/pages/new-post/models/tag';
import { FetchTagsUsecase } from 'src/app/pages/new-post/usecases/fetch-tags.usecase';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
})
export class NewPostComponent implements OnInit {
  patch$ = new Rx.Subject<Partial<BlogPost>>();
  blogPost = new BlogPost();

  constructor(private fetchTagsUsecase: FetchTagsUsecase) {}

  ngOnInit(): void {
    this.patch$.pipe(Rx.debounceTime(200)).subscribe((value) => {
      value.title && (this.blogPost.title = value.title);
      value.body && (this.blogPost.body = value.body);
      value.tags && (this.blogPost.tags = value.tags);
    });

    this.fetchTagsUsecase.exec().subscribe((tags) => {
      this.blogPost.tags = tags;
    });
  }

  onChangeTitle($event: string): void {
    this.patch$.next({ title: $event });
  }

  onChangeBody($event: string): void {
    this.patch$.next({ body: $event });
  }

  onSelectTag($event: Tag): void {
    const tags = this.blogPost.tags.map((t) => {
      return new Tag({
        label: t.label,
        isSelected: t.isSelected || t === $event,
        isPersisted: t.isPersisted,
      });
    });

    this.patch$.next({ tags });
  }

  onDeselectTag($event: Tag): void {
    let tags = [];

    if ($event.isPersisted) {
      tags = this.blogPost.tags.map((t) => {
        return new Tag({
          label: t.label,
          isSelected: t === $event ? false : t.isSelected,
          isPersisted: t.isPersisted,
        });
      });
    } else {
      tags = this.blogPost.tags
        .filter((t) => t !== $event)
        .map((t) => {
          return new Tag({
            label: t.label,
            isSelected: t.isSelected,
            isPersisted: t.isPersisted,
          });
        });
    }

    this.patch$.next({ tags });
  }

  onAddTag($event: string): void {
    const tags = this.blogPost.tags
      .map((t) => {
        return new Tag({
          label: t.label,
          isSelected: t.isSelected,
          isPersisted: t.isPersisted,
        });
      })
      .concat(
        new Tag({
          label: $event,
          isSelected: true,
          isPersisted: false,
        })
      );

    this.patch$.next({ tags });
  }

  onCreatePrButtonClick(): void {
    // TODO:
  }
}
