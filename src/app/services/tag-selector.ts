import { Injectable } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import * as Rx from 'rxjs';
import { splitTag } from 'src/app/utils/split-tag';
import { uniqueTag } from 'src/app/utils/unique-tag';

interface TagSelect {
  tag: string;
  isSelected: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TagSelector {
  #subject$ = new Rx.Subject<TagSelect[]>();
  #tagSelection: TagSelect[] = [];

  load(routes: ScullyRoute[]): void {
    this.#tagSelection = uniqueTag(
      routes.flatMap((route) => splitTag(route['tags']))
    ).map((tag) => ({
      tag,
      isSelected: false,
    }));
    this.next();
  }

  watch(): Rx.Observable<TagSelect[]> {
    return this.#subject$.asObservable();
  }

  select(tag: string): void {
    const match = this.find(tag);

    if (!match) {
      return;
    }

    match.isSelected = true;
    this.next();
  }

  deselect(tag: string): void {
    const match = this.find(tag);

    if (!match) {
      return;
    }

    match.isSelected = false;
    this.next();
  }

  toggle(tag: string): void {
    const match = this.find(tag);

    if (!match) {
      return;
    }

    this.#tagSelection.forEach((tag) => (tag.isSelected = tag === match));
    this.next();
  }

  private find(tag: string): TagSelect | null {
    return (
      this.#tagSelection.find(
        (item) => item.tag.toLowerCase() === tag.toLowerCase()
      ) || null
    );
  }

  private next(): void {
    this.#subject$.next(this.#tagSelection);
  }
}
