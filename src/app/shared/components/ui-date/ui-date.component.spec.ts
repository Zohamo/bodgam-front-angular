import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDateComponent } from './ui-date.component';

describe('UiDateComponent', () => {
  let component: UiDateComponent;
  let fixture: ComponentFixture<UiDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
