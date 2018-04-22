/* Core Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

/* Primary app component imports */
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutes } from './registration.routes';
import { RegistrationService } from './registration.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(RegistrationRoutes)
  ],
  declarations: [
    RegistrationComponent,
  ],
  providers: [
    RegistrationService
  ]
})
export class RegistrationModule { }
