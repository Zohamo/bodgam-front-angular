import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from '@/components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule,
    FontAwesomeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule
  ],
  exports: [
    SpinnerModule,
    FontAwesomeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule
  ]
})
export class AdminUiModule {}
