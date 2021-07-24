import { Pipe, PipeTransform } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { splitTag } from 'src/app/utils/split-tag';
import { tagsMatch } from 'src/app/utils/tags-match';

@Pipe({
  name: 'tagsMatch',
})
export class TagsMatchPipe implements PipeTransform {
  transform(routes: ScullyRoute[], tags: string[]): ScullyRoute[] {
    if (!tags.length) {
      return routes;
    }

    return routes.filter((route) => {
      return tagsMatch(splitTag(route['tags']), tags);
    });
  }
}
