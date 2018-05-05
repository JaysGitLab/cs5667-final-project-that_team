/* Core Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatInputModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material'

/* Primary app component imports */
import { ManageComponent } from './manage.component';
import { ManageRoutes } from './manage.routes';
import { ManageService } from './manage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild(ManageRoutes)
  ],
  declarations: [
    ManageComponent,
  ],
  providers: [
    ManageService
  ]
})
export class ManageModule { }
