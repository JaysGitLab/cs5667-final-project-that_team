import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservationService } from './reservation.service';

/* This component handles user reservation requests via an angular form.
*
* This file uses the reservation service to handle all socket communications.
*/
@Component({
  selector: 'reservation',
  templateUrl: './app/reservation/reservation.template.html',
  providers: [ReservationService]
})
export class ReservationComponent {
  /* Constructor for ReservationComponent
  *
  * initializes a ReservationService instance in the _reservationservice
  * attribute.
  */
  constructor(private _reservationservice: ReservationService) {}

  /* This overrides the ngOnInit function to add functionality.
  *
  * This initializes the fields and sets up the necessary socket hook.
  */
  ngOnInit() {
    //TODO: Initialize fields
    //TODO: Initialize socket hooks with this._reservationservice.on()
    //TODO: emit a signal to get all unavaliable days from server.
  }
}
