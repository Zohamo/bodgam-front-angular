import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

// Components
import { HeaderComponent } from "./header/header.component";

// Material
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";

const routes: Routes = [];

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent, RouterModule],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule {}
