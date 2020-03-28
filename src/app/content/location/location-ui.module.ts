import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonVisibilityModule, MapModule, SpinnerModule } from '@/components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSliderModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ButtonVisibilityModule,
    FontAwesomeModule,
    MapModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSliderModule,
    MatTableModule,
    SpinnerModule
  ],
  exports: [
    ButtonVisibilityModule,
    FontAwesomeModule,
    MapModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSliderModule,
    MatTableModule,
    SpinnerModule
  ]
})
export class LocationUiModule {}
