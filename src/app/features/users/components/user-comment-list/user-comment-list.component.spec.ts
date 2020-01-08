import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommentListComponent } from './user-comment-list.component';

describe('UserCommentListComponent', () => {
  let component: UserCommentListComponent;
  let fixture: ComponentFixture<UserCommentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCommentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
