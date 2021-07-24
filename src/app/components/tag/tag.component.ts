import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() tag?: string;
  @Output() emitClick = new EventEmitter<string>();

  tags!: string[];

  constructor() {}

  ngOnInit(): void {
    this.tags = (this.tag || '').split(' ').filter((v) => !!v);
  }
}
