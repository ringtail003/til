import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  SnippetConverter,
  SnippetKey,
} from 'src/app/pages/new-post/components/snippet-converter.service';
import { Tag } from 'src/app/pages/new-post/models/tag';
import { FetchTagsUsecase } from 'src/app/pages/new-post/usecases/fetch-tags.usecase';

@Component({
  selector: 'new-post-editor',
  templateUrl: './new-post-editor.component.html',
})
export class NewPostEditorComponent implements OnInit {
  @Input() title!: string;
  @Input() body!: string;

  @ViewChild('bodyElement', { static: false }) bodyElement!: ElementRef;

  @Output()
  onChangeTitle = new EventEmitter<string>();
  @Output() onChangeBody = new EventEmitter<string>();

  tags: Tag[] = [];

  constructor(
    private snippetConverter: SnippetConverter,
    private fetchTagsUsecase: FetchTagsUsecase
  ) {}

  ngOnInit(): void {
    this.fetchTagsUsecase.exec().subscribe((tags) => {
      this.tags = tags;
    });
  }

  onSnippetSelected(snippetKey: SnippetKey): void {
    const element = this.bodyElement.nativeElement as HTMLTextAreaElement;

    const body = this.snippetConverter.convert(
      this.body,
      element.selectionStart,
      element.selectionEnd,
      snippetKey
    );

    this.bodyElement.nativeElement.value = body;
    this.onChangeBody.emit(body);
  }
}
