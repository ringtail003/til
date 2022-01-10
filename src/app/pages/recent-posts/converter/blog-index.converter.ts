import { Injectable } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { BlogPost } from 'src/app/pages/recent-posts/models/blog-post';

@Injectable({ providedIn: 'root' })
export class BlogPostConverter {
  byScullyRoute(scullyRoute: ScullyRoute): BlogPost {
    if (!scullyRoute.title) {
      throw new Error(`title is empty.`);
    }

    if (!scullyRoute.updatedAt) {
      throw new Error(`updatedAt is empty.`);
    }

    return new BlogPost({
      link: scullyRoute.route,
      title: scullyRoute.title,
      updatedAt: this.convertDate(scullyRoute.updatedAt),
      tags: this.convertTag(scullyRoute.tags || ''),
    });
  }

  private convertDate(isoString: string): Date {
    const time = Date.parse(isoString);

    if (isNaN(time)) {
      throw new Error(`${isoString} is not ISO date format.`);
    }

    return new Date(time);
  }

  private convertTag(text: string): string[] {
    const labels = text
      .split(',')
      .filter((value) => !!value)
      .map((value) => value.trim())
      .map((value) => value.toLowerCase());

    const set = new Set(labels);

    return Array.from(set.values());
  }
}
