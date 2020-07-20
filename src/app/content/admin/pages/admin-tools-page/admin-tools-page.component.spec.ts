import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminToolsPageComponent } from './admin-tools-page.component';

describe('AdminToolsPageComponent', () => {
  let component: AdminToolsPageComponent;
  let fixture: ComponentFixture<AdminToolsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminToolsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminToolsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
