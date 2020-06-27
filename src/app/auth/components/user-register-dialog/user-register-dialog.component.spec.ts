import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterDialogComponent } from './user-register-dialog.component';

describe('UserRegisterDialogComponent', () => {
  let component: UserRegisterDialogComponent;
  let fixture: ComponentFixture<UserRegisterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegisterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
