# useExisting:FormGroupDirectiveなコンポーネントを単体でテストする

```typescript
@Component({
  selector: 'simple-line-input',
  templateUrl: './simple-line-input.component.html',
  styleUrls: ['./simple-line-input.component.scss'],
  viewProviders:[{
    provide: ControlContainer,
    useExisting: FormGroupDirective,
  }],
})
export class SimpleLineInputComponent implements OnInit {
  @Input() name: string = null;

  constructor() { }

  ngOnInit() {
  }

}
```

```typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleLineInputComponent } from './simple-line-input.component';
import { UnitComponentModule } from '..';
import { FormGroupDirective, FormGroup, ControlContainer, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <form [formGroup]="$form">
      <simple-line-input [name]="'foo'"></simple-line-input>
    </form>
  `
})
class MockContainerComponent implements OnInit {
  $form: FormGroup = null;

  ngOnInit() {
    this.$form = new FormGroup({
      foo: new FormControl('foo'),
    });
  }
}

describe('SimpleLineInputComponent', () => {
  let component: MockContainerComponent;
  let fixture: ComponentFixture<MockContainerComponent>;

  beforeEach(async(() => {
    let mockDirective = new FormGroupDirective([], []);
    mockDirective.form = new FormGroup({
      foo: new FormControl(),
    });

    TestBed.configureTestingModule({
      imports: [
        UnitComponentModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [ MockContainerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('display value', () => {
    expect(fixture.debugElement.query(By.css('input')).nativeElement.value).toBe('foo');
  });
});

```
