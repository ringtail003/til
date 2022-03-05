export class Tag {
  #label: string;

  constructor(params: { label: string }) {
    this.#label = params.label.toLowerCase();
  }

  get label(): string {
    return this.#label;
  }
}
