import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatBadgeModule, MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  declarations: [NotificationsComponent],
  exports: [NotificationsComponent]
})
export class NotificationsModule {}
