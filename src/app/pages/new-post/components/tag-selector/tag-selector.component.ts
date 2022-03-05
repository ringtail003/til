import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/app/pages/new-post/models/tag';

@Component({
  selector: 'tag-selector',
  templateUrl: './tag-selector.component.html',
})
export class TagSelectorComponent implements OnInit {
  @Input() tags: Tag[] = [];

  constructor() {}

  ngOnInit(): void {}
}
