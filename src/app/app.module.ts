import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

// Modules
import * as fromModules from './modules';
import { SharedModule } from './shared/shared.module';

// UI
import { MatDateFormats, MatSnackBarModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';

export const MY_FORMAT: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    MatSnackBarModule,
    SharedModule,
    ...fromModules.modules
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }, { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT }],
  bootstrap: [AppComponent]
})
export class AppModule {}
