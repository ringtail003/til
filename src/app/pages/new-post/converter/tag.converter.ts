import { Injectable } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Tag } from 'src/app/pages/new-post/models/tag';

@Injectable({ providedIn: 'root' })
export class TagConverter {
  byScullyRoutes(scullyRoutes: ScullyRoute[]): Tag[] {
    const labels = scullyRoutes
      .flatMap((route) => {
        return ((route.tags as string) || '').split(',');
      })
      .map((value) => value.trim())
      .map((value) => value.toLowerCase())
      .filter((value) => !!value)
      .filter((value) => value !== '/');

    const uniqueLabels = this.unique(labels);
    const sortedLabels = this.sort(uniqueLabels);

    return sortedLabels.map(
      (label) => new Tag({ label, isSelected: false, isPersisted: true })
    );
  }

  private unique(labels: string[]): string[] {
    return [...new Set(labels)];
  }

  private sort(labels: string[]): string[] {
    return labels.sort((a, b) => {
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }
}
