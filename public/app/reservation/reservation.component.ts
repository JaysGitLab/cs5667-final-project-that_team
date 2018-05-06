import { Component } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ReservationService } from './reservation.service';
import { Router } from '@angular/router'
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
  dateFilter: any;
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
  constructor(private _reservationservice: ReservationService, private router:Router) {}

  /* This overrides the ngOnInit function to add functionality.
  *
  * This initializes the fields and sets up the necessary socket hook.
  */
  ngOnInit() {
    this._reservationservice.on('message', (message) => {
      console.log(message);
    });
    this._reservationservice.on('dateListResponse', (message) => {
      this.dateFilter = (d: Date): boolean => {
        var today = new Date();
        return !message.dateList.includes(d.toISOString()) && d > today;
      }
    });
    this._reservationservice.on('reservationSuccessful', (message) => {
      this.router.navigateByUrl(`/manage/${message.secret}`);
    })
    this._reservationservice.emit('dateList', {});
    //TODO: Initialize fields
    //TODO: Initialize socket hooks with this._reservationservice.on()
    //TODO: emit a signal to get all unavaliable days from server.
  }

  /*This method handles form submissions.
  *
  * @params: form - the ngform object
  */
  onSubmit(form: NgForm) {
    if (form.valid && this.emailFormControl.valid) {
      var submission = JSON.parse(JSON.stringify(form.value));
      submission.email = this.emailFormControl.value;
      this._reservationservice.emit('reservationCreated', {form: JSON.stringify(submission)});
    }
  }
}
