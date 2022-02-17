import { marked } from 'marked';

export class BlogPost {
  #title: string;
  #updatedAt: Date;
  #body: string;
  #bodyAsHtml: string;

  constructor() {
    this.#title = '';
    this.#updatedAt = new Date();
    this.#body = '';
    this.#bodyAsHtml = '';
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
}
