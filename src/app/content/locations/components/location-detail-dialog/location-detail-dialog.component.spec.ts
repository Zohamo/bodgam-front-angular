import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDetailDialogComponent } from './location-detail-dialog.component';

describe('LocationDetailDialogComponent', () => {
  let component: LocationDetailDialogComponent;
  let fixture: ComponentFixture<LocationDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
