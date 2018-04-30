import { Component } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ReservationService } from './reservation.service';
import { ErrorStateMatcher } from '@angular/material/core';

/* Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  matcher = new MyErrorStateMatcher();
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
    this._reservationservice.on('message', (message) => {
      console.log(message);
    });
    this._reservationservice.emit('test', {});
    //TODO: Initialize fields
    //TODO: Initialize socket hooks with this._reservationservice.on()
    //TODO: emit a signal to get all unavaliable days from server.
  }

  /*This method handles form submissions.
  *
  * @params: form - the ngform object
  */
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(JSON.stringify(form.value));
      this._reservationservice.emit('reservationCreated', {form: JSON.stringify(form.value)});
    }
  }
}
