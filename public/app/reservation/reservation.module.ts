/* Core Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatInputModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material'

/* Primary app component imports */
import { ReservationComponent } from './reservation.component';
import { ReservationRoutes } from './reservation.routes';
import { ReservationService } from './reservation.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild(ReservationRoutes)
  ],
  declarations: [
    ReservationComponent,
  ],
  providers: [
    ReservationService
  ]
})
export class ReservationModule { }
