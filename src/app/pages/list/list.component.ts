import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TagSelector } from 'src/app/services/tag-selector';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  posts: ScullyRoute[] = [];
  tags: string[] = [];

  #posts$: Observable<ScullyRoute[]> = this.scully.available$.pipe(
    map((posts) => posts.filter((v) => v.route !== '/')),
    map((posts) => this.sortBy(posts, 'updatedAt'))
  );

  constructor(
    private scully: ScullyRoutesService,
    private tagSelector: TagSelector
  ) {}

  ngOnInit() {
    this.tagSelector
      .watch()
      .subscribe(
        (tags) =>
          (this.tags = tags
            .filter((tag) => tag.isSelected)
            .map((tag) => tag.tag))
      );

    this.#posts$.subscribe((posts) => {
      this.posts = posts;
      this.tagSelector.load(posts);
    });
  }

  sortBy(posts: ScullyRoute[], field: string): ScullyRoute[] {
    return posts.sort((a, b) => {
      if (a[field] > b[field]) {
        return -1;
      }

      if (a[field] < b[field]) {
        return 1;
      }

      return 0;
    });
  }
}
