import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEventListPageComponent } from './profile-event-list-page.component';

describe('ProfileEventListPageComponent', () => {
  let component: ProfileEventListPageComponent;
  let fixture: ComponentFixture<ProfileEventListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEventListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEventListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
