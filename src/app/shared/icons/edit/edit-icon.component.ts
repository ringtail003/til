import { Component, OnInit } from '@angular/core';
import { BaseIconComponent } from 'src/app/shared/icons/base-icon.component';

@Component({
  selector: 'edit-icon',
  templateUrl: './edit-icon.component.html',
})
export class EditIconComponent extends BaseIconComponent implements OnInit {
  ngOnInit(): void {}
}
