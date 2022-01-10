import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { TagConverter } from 'src/app/pages/recent-posts/converter/tag.converter';
import { ScullyRouteProvider } from 'src/app/pages/recent-posts/data-sources/scully-route.provider';
import { Tag } from 'src/app/pages/recent-posts/models/tag';

@Injectable({
  providedIn: 'root',
})
export class FetchTagsUsecase {
  constructor(
    private scullyRouteProvider: ScullyRouteProvider,
    private tagConverter: TagConverter
  ) {}

  exec(): Observable<Tag[]> {
    return this.scullyRouteProvider.fetch().pipe(
      take(1),
      map((scullyRoutes) => {
        return this.tagConverter.byScullyRoutes(scullyRoutes);
      }),
      map((tags) => this.sortAsc(tags))
    );
  }

  private sortAsc(tags: Tag[]): Tag[] {
    const list = Array.from(tags);

    list.sort((a, b) => {
      const diff = a.label.localeCompare(b.label, 'ja');

      return diff > 0 ? 1 : diff < 0 ? -1 : 0;
    });

    return list;
  }
}
