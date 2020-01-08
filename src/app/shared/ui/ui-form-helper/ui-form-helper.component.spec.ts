import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFormHelperComponent } from './ui-form-helper.component';

describe('UiFormHelperComponent', () => {
  let component: UiFormHelperComponent;
  let fixture: ComponentFixture<UiFormHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiFormHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiFormHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
