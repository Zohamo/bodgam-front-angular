import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiVisibilityComponent } from './ui-visibility.component';

describe('UiVisibilityComponent', () => {
  let component: UiVisibilityComponent;
  let fixture: ComponentFixture<UiVisibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiVisibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
