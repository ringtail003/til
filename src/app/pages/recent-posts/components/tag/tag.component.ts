import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/app/pages/recent-posts/models/tag';
import { TagSelector } from 'src/app/pages/recent-posts/services/tag-selector';

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
})
export class TagComponent implements OnInit {
  @Input() tag!: Tag;

  constructor(private tagSelector: TagSelector) {}

  ngOnInit(): void {}

  onToggle(tag: Tag): void {
    this.tagSelector.toggle(tag);
  }
}
