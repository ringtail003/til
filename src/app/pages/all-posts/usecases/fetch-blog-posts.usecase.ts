import { Injectable } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { map, Observable, take } from 'rxjs';
import { BlogPostConverter } from 'src/app/pages/all-posts/converter/blog-post.converter';
import { ScullyRouteProvider } from 'src/app/pages/all-posts/data-sources/scully-route.provider';
import { BlogPost } from 'src/app/pages/all-posts/models/blog-post';
import { InvalidBlogPostError } from 'src/app/utils/errors/invalid-blog-index.error';

@Injectable({
  providedIn: 'root',
})
export class FetchBlogPostUsecase {
  constructor(
    private scullyRouteProvider: ScullyRouteProvider,
    private blogPostConverter: BlogPostConverter
  ) {}

  exec(): Observable<BlogPost[]> {
    return this.scullyRouteProvider.fetch().pipe(
      take(1),
      map((scullyRoutes) => this.convertArray(scullyRoutes)),
      map((blogPosts) => this.sortDesc(blogPosts))
    );
  }

  private sortDesc(blogPosts: BlogPost[]): BlogPost[] {
    const list = Array.from(blogPosts);

    list.sort((a, b) => {
      const timeA = a.updatedAt.getTime();
      const timeB = b.updatedAt.getTime();

      return timeA < timeB ? 1 : timeA > timeB ? -1 : 0;
    });

    return list;
  }

  private convertArray(scullyRoutes: ScullyRoute[]): BlogPost[] {
    return scullyRoutes
      .filter((route) => route.route !== '/')
      .map((route) => this.convert(route));
  }

  private convert(scullyRoute: ScullyRoute): BlogPost {
    try {
      return this.blogPostConverter.byScullyRoute(scullyRoute);
    } catch (e) {
      throw new InvalidBlogPostError((e as Error).message, scullyRoute.route);
    }
  }
}
