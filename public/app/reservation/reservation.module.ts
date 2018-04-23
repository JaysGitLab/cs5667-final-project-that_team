/* Core Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

/* Primary app component imports */
import { ReservationComponent } from './reservation.component';
import { ReservationRoutes } from './reservation.routes';
import { ReservationService } from './reservation.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
