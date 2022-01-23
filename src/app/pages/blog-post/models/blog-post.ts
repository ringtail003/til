export class BlogPost {
  #title: string;
  #updatedAt: Date;

  constructor(params: { title: string; updatedAt: Date }) {
    this.#title = params.title;
    this.#updatedAt = params.updatedAt;
  }

  get title(): string {
    return this.#title;
  }

  get updatedAt(): Date {
    return new Date(this.#updatedAt.getTime());
  }
}
