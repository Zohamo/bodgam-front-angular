import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonVisibilityComponent } from './button-visibility.component';

describe('ButtonVisibilityComponent', () => {
  let component: ButtonVisibilityComponent;
  let fixture: ComponentFixture<ButtonVisibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonVisibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
