import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHelperComponent } from './form-helper.component';

describe('FormHelperComponent', () => {
  let component: FormHelperComponent;
  let fixture: ComponentFixture<FormHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
