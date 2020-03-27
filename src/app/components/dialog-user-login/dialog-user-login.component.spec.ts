import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserLoginComponent } from './dialog-user-login.component';

describe('DialogUserLoginComponent', () => {
  let component: DialogUserLoginComponent;
  let fixture: ComponentFixture<DialogUserLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUserLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
