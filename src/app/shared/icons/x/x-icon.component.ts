import { Component, OnInit } from '@angular/core';
import { BaseIconComponent } from 'src/app/shared/icons/base-icon.component';

@Component({
  selector: 'x-icon',
  templateUrl: './x-icon.component.html',
})
export class XIconComponent extends BaseIconComponent implements OnInit {
  ngOnInit(): void {}
}
