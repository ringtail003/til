import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'new-post-editor',
  templateUrl: './new-post-editor.component.html',
})
export class NewPostEditorComponent implements OnInit {
  @Input() title!: string;
  @Input() body!: string;

  @Output() onChangeTitle = new EventEmitter<string>();
  @Output() onChangeBody = new EventEmitter<string>();

  ngOnInit(): void {}
}
