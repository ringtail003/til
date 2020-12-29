import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'view-list-icon',
  templateUrl: './view-list-icon.component.html',
  styleUrls: ['./view-list-icon.component.scss'],
})
export class ViewListIconComponent implements OnInit {
  @Input() hoge = '';

  constructor() {}

  ngOnInit() {}
}
