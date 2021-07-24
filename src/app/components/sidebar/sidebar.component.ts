import { Component, OnInit } from '@angular/core';
import { TagSelector } from 'src/app/services/tag-selector';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  tags: { tag: string; isSelected: boolean }[] = [];

  constructor(private tagSelector: TagSelector) {}

  ngOnInit(): void {
    this.tagSelector.watch().subscribe((tags) => (this.tags = tags));
  }

  handleClick(event: string): void {
    this.tagSelector.toggle(event);
  }
}
