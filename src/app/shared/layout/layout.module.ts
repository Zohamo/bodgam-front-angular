import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HeaderComponent } from './header/header.component';

// Material
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent, RouterModule]
})
export class LayoutModule {}
