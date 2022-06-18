import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { Tag } from 'src/app/pages/new-post/models/tag';

@Component({
  selector: 'tag-selector',
  templateUrl: './tag-selector.component.html',
})
export class TagSelectorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tags: Tag[] = [];
  @Output() onSelected = new EventEmitter<Tag[]>();

  @ViewChild('tagLabelInput') tagLabelInput!: ElementRef;

  isOpenDropdown = false;
  tagLabel = new FormControl();
  selectedTags: Tag[] = [];
  suggestedTags: Tag[] = [];

  destroy$ = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.tagLabel.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.createSuggests();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.emit();
  }

  openDropdown(): void {
    this.createSuggests();
  }

  closeDropdown(): void {
    this.suggestedTags = [];
  }

  select(tag: Tag): void {
    tag.select();
    this.selectedTags = this.tags.filter((tag) => tag.isSelected);
    this.createSuggests();
    this.tagLabel.reset();
    this.tagLabelInput.nativeElement.focus();
    this.emit();
  }

  deselect(tag: Tag): void {
    tag.deselect();
    this.tags = this.tags.filter((tag) => tag.isPersisted || tag.isSelected);
    this.selectedTags = this.tags.filter((tag) => tag.isSelected);
    this.createSuggests();
    this.tagLabel.reset();
    this.tagLabelInput.nativeElement.focus();
    this.emit();
  }

  createNewTag($event: Event): void {
    $event.preventDefault();

    if (!this.tagLabel.value) {
      return;
    }

    const tag = new Tag({
      label: this.tagLabel.value,
      isSelected: true,
      isPersisted: false,
    });

    this.tags.push(tag);
    this.select(tag);
  }

  private createSuggests(): void {
    this.suggestedTags = this.tags.filter((tag) => {
      if (!this.tagLabel.valid) {
        return true;
      }

      if (tag.isSelected) {
        return false;
      }

      return tag.match(this.tagLabel.value);
    });
  }

  private emit(): void {
    this.onSelected.emit(this.selectedTags);
  }
}
