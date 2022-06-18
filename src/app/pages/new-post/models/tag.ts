export class Tag {
  #label: string;
  #isSelected: boolean;
  #isPersisted: boolean;

  constructor(params: {
    label: string;
    isSelected: boolean;
    isPersisted?: boolean;
  }) {
    this.#label = params.label.toLowerCase();
    this.#isSelected = params.isSelected;
    this.#isPersisted = params.isPersisted ?? true;
  }

  get label(): string {
    return this.#label;
  }

  get isSelected(): boolean {
    return this.#isSelected;
  }

  get isPersisted(): boolean {
    return this.#isPersisted;
  }

  match(label: string): boolean {
    if (!label) {
      return true;
    }

    return this.#label.includes(label.toLowerCase());
  }

  select(): void {
    this.#isSelected = true;
  }

  deselect(): void {
    this.#isSelected = false;
  }
}
