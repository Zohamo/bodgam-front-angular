import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEditPageComponent } from './location-edit-page.component';

describe('LocationEditPageComponent', () => {
  let component: LocationEditPageComponent;
  let fixture: ComponentFixture<LocationEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
