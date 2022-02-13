import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'create-pr-button',
  templateUrl: './create-pr-button.component.html',
})
export class CreatePrButtonComponent implements OnInit {
  @Output() onClick = new EventEmitter<void>();

  ngOnInit(): void {}
}
