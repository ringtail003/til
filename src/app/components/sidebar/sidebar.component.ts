import { Component, OnInit } from '@angular/core';
import tags from 'src/tags.json';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  tags!: string[];

  ngOnInit(): void {
    this.tags = tags;
  }
}
