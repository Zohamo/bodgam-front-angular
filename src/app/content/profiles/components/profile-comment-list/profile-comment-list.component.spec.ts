import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCommentListComponent } from './profile-comment-list.component';

describe('ProfileCommentListComponent', () => {
  let component: ProfileCommentListComponent;
  let fixture: ComponentFixture<ProfileCommentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileCommentListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
