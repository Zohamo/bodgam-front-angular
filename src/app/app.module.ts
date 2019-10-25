import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { EventsModule } from './features/events/events.module';
import { LocationEditPageComponent } from './features/locations/pages/location-edit-page/location-edit-page.component';
import { LocationFormComponent } from './features/locations/components/location-form/location-form.component';
import { MatDateFormats, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';

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
  declarations: [AppComponent, LocationEditPageComponent, LocationFormComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, SharedModule, EventsModule],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }, { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT }],
  bootstrap: [AppComponent]
})
export class AppModule {}
