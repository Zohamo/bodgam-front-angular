import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserRegisterComponent } from './dialog-user-register.component';

describe('DialogUserRegisterComponent', () => {
  let component: DialogUserRegisterComponent;
  let fixture: ComponentFixture<DialogUserRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUserRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
