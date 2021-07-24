import { Pipe, PipeTransform } from '@angular/core';
import { splitTag } from 'src/app/utils/split-tag';

@Pipe({
  name: 'splitTag',
})
export class SplitTagPipe implements PipeTransform {
  transform(tagsString: string): string[] {
    return splitTag(tagsString);
  }
}
