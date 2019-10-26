import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDetailIconsComponent } from './location-detail-icons.component';

describe('LocationDetailIconsComponent', () => {
  let component: LocationDetailIconsComponent;
  let fixture: ComponentFixture<LocationDetailIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDetailIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDetailIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
