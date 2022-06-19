import { marked } from 'marked';
import { Tag } from 'src/app/pages/new-post/models/tag';

export class BlogPost {
  #title: string;
  #updatedAt: Date;
  #body: string;
  #bodyAsHtml: string;
  #tags: Tag[];

  constructor() {
    this.#title = '';
    this.#updatedAt = new Date();
    this.#body = '';
    this.#bodyAsHtml = '';
    this.#tags = [];
  }

  get title(): string {
    return this.#title;
  }
  set title(value: string) {
    this.#title = value;
  }

  get body(): string {
    return this.#body;
  }
  set body(value: string) {
    this.#body = value;
    this.#bodyAsHtml = marked.parse(value);
  }

  get bodyAsHtml(): string {
    return this.#bodyAsHtml;
  }

  get updatedAt(): Date {
    return new Date(this.#updatedAt.getTime());
  }

  get tags(): Tag[] {
    return this.#tags;
  }
  set tags(tags: Tag[]) {
    this.#tags = tags;
  }
}
