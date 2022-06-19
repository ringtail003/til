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
  @Output() selectTag = new EventEmitter<Tag>();
  @Output() deselectTag = new EventEmitter<Tag>();
  @Output() addTag = new EventEmitter<string>();

  @ViewChild('tagLabelInput') tagLabelInput!: ElementRef;

  isOpenDropdown = false;
  formControl = new FormControl();
  selectedTags: Tag[] = [];
  suggestedTags: Tag[] = [];
  newTagLabel: string | null = null;

  destroy$ = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.suggestedTags = this.tags
          .filter((tag) => !tag.isSelected)
          .filter((tag) => tag.match(value));

        this.newTagLabel = value || null;
      });
  }

  ngOnChanges(): void {
    this.selectedTags = this.tags.filter((tag) => tag.isSelected);
    this.suggestedTags = this.tags.filter((tag) => !tag.isSelected);
    this.newTagLabel = null;
  }

  ngOnDestroy(): void {
    this.destroy$.emit();
  }

  onFocusInput(): void {
    this.isOpenDropdown = true;
  }

  onClickCloseButton(): void {
    this.isOpenDropdown = false;
  }

  onSelect(tag: Tag): void {
    this.selectTag.emit(tag);
    this.formControl.setValue(null, { emitEvent: false });
    this.tagLabelInput.nativeElement.focus();
  }

  onDeselect(tag: Tag): void {
    this.deselectTag.emit(tag);
    this.formControl.setValue(null, { emitEvent: false });
    this.tagLabelInput.nativeElement.focus();
  }

  onSubmit($event: Event): void {
    $event.preventDefault();

    if (!this.formControl.value) {
      return;
    }

    this.addTag.emit(this.formControl.value);
    this.formControl.setValue(null, { emitEvent: false });
    this.tagLabelInput.nativeElement.focus();
  }

  onAddTag($event: string): void {
    this.addTag.emit($event);
    this.formControl.setValue(null, { emitEvent: false });
    this.tagLabelInput.nativeElement.focus();
  }
}
