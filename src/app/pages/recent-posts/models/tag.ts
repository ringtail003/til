export class Tag {
  #label: string;
  #isSelected: boolean;

  constructor(params: { label: string; isSelected: boolean }) {
    this.#label = params.label.toLowerCase();
    this.#isSelected = params.isSelected;
  }

  get label(): string {
    return this.#label;
  }

  get isSelected(): boolean {
    return this.#isSelected;
  }

  match(label: string): boolean {
    return this.#label === label.toLowerCase();
  }

  select(): void {
    this.#isSelected = true;
  }

  deselect(): void {
    this.#isSelected = false;
  }
}

export const unselectedTag = (label: string): Tag => {
  return new Tag({ label, isSelected: false });
};
