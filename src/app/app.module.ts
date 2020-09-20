import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

// Imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AuthModule } from './auth/auth.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutModule } from '@/layout/layout.module';
import { SnackBarMessageModule } from './components';
import * as fromContent from './content';

// Declarations
import * as fromPages from './pages';

// Providers
import { ErrorInterceptor, JwtInterceptor } from '@/helpers';
import { MatDateFormats, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatExpansionModule } from '@angular/material';

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
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AuthModule,
    LayoutModule,
    SnackBarMessageModule,
    FontAwesomeModule, // For Home Page
    MatExpansionModule, // For Home Page
    ...fromContent.modules
  ],
  declarations: [AppComponent, ...fromPages.components],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
