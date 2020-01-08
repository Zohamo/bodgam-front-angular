import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsModule } from '../events/events.module';
import { GamesModule } from '../games/games.module';
import { LocationsModule } from '../locations/locations.module';
// Pages
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserEditPageComponent } from './pages/user-edit-page/user-edit-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
// Components
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserPrivacyFormComponent } from './components/user-privacy-form/user-privacy-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRatingsComponent } from './components/user-ratings/user-ratings.component';
import { UserCommentListComponent } from './components/user-comment-list/user-comment-list.component';
// UI
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UiModule } from 'src/app/shared/ui/ui.module';

@NgModule({
  declarations: [
    UserPageComponent,
    UserEditPageComponent,
    UsersPageComponent,
    UserDetailComponent,
    UserFormComponent,
    UserPrivacyFormComponent,
    UserListComponent,
    UserRatingsComponent,
    UserCommentListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    FontAwesomeModule,
    EventsModule,
    GamesModule,
    LocationsModule,
    UiModule
  ]
})
export class UsersModule {}
