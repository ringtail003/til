import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Tag } from 'src/app/pages/new-post/models/tag';

@Component({
  selector: 'tag-selector',
  templateUrl: './tag-selector.component.html',
})
export class TagSelectorComponent implements OnInit {
  @Input() tags: Tag[] = [];
  @Output() onSelected = new EventEmitter<Tag[]>();

  @ViewChild('tagLabelInput') tagLabelInput!: ElementRef;

  isOpen = false;
  isSelected = false;
  tagLabel = new FormControl();

  constructor() {}

  ngOnInit(): void {
    this.isSelected = !!this.tags.find((tag) => tag.isSelected);
  }

  openDropdown(): void {
    this.isOpen = true;
  }

  select(tag: Tag): void {
    tag.select();
    this.emit();
    this.isSelected = true;
    this.tagLabel.reset();
    this.tagLabelInput.nativeElement.focus();
  }

  deselect(tag: Tag): void {
    if (tag.isPersisted) {
      tag.deselect();
    } else {
      this.tags = this.tags.filter((t) => t !== tag);
    }

    this.isSelected = !!this.tags.find((tag) => tag.isSelected);
    this.emit();
  }

  createNewTag($event: Event): void {
    $event.preventDefault();

    if (!this.tagLabel.value) {
      return;
    }
    this.tags.push(
      new Tag({
        label: this.tagLabel.value,
        isSelected: true,
        isPersisted: false,
      })
    );
    this.isSelected = !!this.tags.find((tag) => tag.isSelected);
    this.emit();

    this.tagLabel.reset();
    this.tagLabelInput.nativeElement.focus();
  }

  private emit(): void {
    this.onSelected.emit(this.tags.filter((tag) => tag.isSelected));
  }
}
