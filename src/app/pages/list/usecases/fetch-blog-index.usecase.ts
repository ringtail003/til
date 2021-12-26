import { Injectable } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { map, Observable, take } from 'rxjs';
import { BlogIndexConverter } from 'src/app/pages/list/converter/blog-index.converter';
import { ScullyRouteProvider } from 'src/app/pages/list/data-sources/scully-route.provider';
import { BlogIndex } from 'src/app/pages/list/models/blog-index';
import { InvalidBlogIndexError } from 'src/app/utils/errors/invalid-blog-index.error';

@Injectable({
  providedIn: 'root',
})
export class FetchBlogIndexUsecase {
  constructor(
    private scullyRouteProvider: ScullyRouteProvider,
    private blogIndexConverter: BlogIndexConverter
  ) {}

  exec(): Observable<BlogIndex[]> {
    return this.scullyRouteProvider.fetch().pipe(
      take(1),
      map((scullyRoutes) => this.convertArray(scullyRoutes)),
      map((blogIndexes) => this.sortDesc(blogIndexes))
    );
  }

  private sortDesc(blogIndexes: BlogIndex[]): BlogIndex[] {
    const list = Array.from(blogIndexes);

    list.sort((a, b) => {
      const timeA = a.updatedAt.getTime();
      const timeB = b.updatedAt.getTime();

      return timeA < timeB ? 1 : timeA > timeB ? -1 : 0;
    });

    return list;
  }

  private convertArray(scullyRoutes: ScullyRoute[]): BlogIndex[] {
    return scullyRoutes
      .filter((route) => route.route !== '/')
      .map((route) => this.convert(route));
  }

  private convert(scullyRoute: ScullyRoute): BlogIndex {
    try {
      return this.blogIndexConverter.byScullyRoute(scullyRoute);
    } catch (e) {
      throw new InvalidBlogIndexError((e as Error).message, scullyRoute.route);
    }
  }
}
