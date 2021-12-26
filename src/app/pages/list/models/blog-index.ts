import { Tag } from 'src/app/pages/list/models/tag';

export class BlogIndex {
  #link: string;
  #title: string;
  #updatedAt: Date;
  #tags: string[];

  constructor(params: {
    link: string;
    title: string;
    updatedAt: Date;
    tags: string[];
  }) {
    this.#link = params.link;
    this.#title = params.title;
    this.#updatedAt = params.updatedAt;
    this.#tags = params.tags;
  }

  get link(): string {
    return this.#link;
  }

  get title(): string {
    return this.#title;
  }

  get updatedAt(): Date {
    return new Date(this.#updatedAt.getTime());
  }

  get tags(): string[] {
    return Array.from(this.#tags);
  }

  some(tags: string[]): boolean {
    return !!tags.find((tag) => this.match(tag));
  }

  match(tag: string): boolean {
    return !!this.#tags.find((item) => item === tag);
  }
}
