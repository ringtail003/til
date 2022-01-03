import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { Tag } from 'src/app/pages/list/models/tag';

@Injectable({
  providedIn: 'root',
})
export class TagSelector {
  #subject$ = new Rx.Subject<Tag[]>();
  #tags: Tag[] = [];

  set tags(tags: Tag[]) {
    this.#tags = tags;
  }

  watch(): Rx.Observable<Tag[]> {
    return this.#subject$.asObservable();
  }

  select(tag: Tag): void {
    this.#tags.find((item) => item.isSelected)?.deselect();
    this.#tags.find((item) => item.match(tag.label))?.select();
    this.next();
  }

  deselect(tag: Tag): void {
    this.#tags.find((item) => item.match(tag.label))?.deselect();
    this.next();
  }

  toggle(tag: Tag): void {
    if (tag.isSelected) {
      this.deselect(tag);
    } else {
      this.select(tag);
    }
  }

  private next(): void {
    this.#subject$.next(this.#tags);
  }
}
