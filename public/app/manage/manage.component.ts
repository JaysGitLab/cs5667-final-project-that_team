import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageService } from './manage.service';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
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
  selector: 'manage',
  templateUrl: './app/manage/manage.template.html',
  providers: [ManageService]
})
export class ManageComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  matcher = new MyErrorStateMatcher();
  dateFilter: any;
  dateChoice: boolean = false;
  reservationid: any;
  firstname: string;
  lastname: string;
  email: string;
  reservationDate: Date;
  created: Date;
  status: string;
  loaded: boolean = false;
  error:string = null;
  message:string = null;

  /* Constructor for ReservationComponent
  *
  * initializes a ReservationService instance in the _reservationservice
  * attribute.
  */
  constructor(private _manageService: ManageService, private route:ActivatedRoute) {}

  /* This overrides the ngOnInit function to add functionality.
  *
  * This initializes the fields and sets up the necessary socket hook.
  */
  ngOnInit() {
    //Get the url parameter
    this.reservationid = this.route.snapshot.params['reservationid'];

    //Configure the ManageService
    this._manageService.on('reservationData', (message) => {
      if (message != null) {
        this.firstname = message.firstname;
        this.lastname = message.lastname;
        this.email = message.email;
        this.reservationDate = new Date(message.reservationDate);
        this.created = new Date(message.created);
        this.status = message.status;
        this.loaded = true;
      }
      else {
        this.error = "It seems we couldn't find your reservation, was it deleted?";
      }
    });
    this._manageService.on('accessFailed', (message) => {
      this.error = `Sorry, we ran into an error loading your reservation, try again later!  Error Message: ${message.message}`
    });
    this._manageService.on('dateListResponse', (message) => {
      this.dateFilter = (d: Date): boolean => {
        return !message.dateList.includes(d.toISOString());
      }
      this.dateChoice = true;
    });
    this._manageService.on('reservationDeleted', (message) => {
      this.loaded = false;
      this.message = "Reservation Successfully Cancelled";
    });
    this._manageService.emit('getReservationData', {reservationid: this.reservationid});
  }

  /*This function handles the user's request to change the date.  This will load
  * the list of unavaliable dates and set a boolean flag once completed.
  */
  loadDateChanger() {
    this._manageService.emit('dateList', {});
  }

  /*This function handles the user's request to change the date of their
  * reservation.  This will display an error if it occurs.
  */
  dateChange(form: NgForm) {
    if (form.valid) {
      var submission = JSON.parse(JSON.stringify(form.value));
      this._manageService.emit('dateChange', {
        date: submission.date,
        secret: this.reservationid
      });
    }
  }

  /*This method handles the cancellation of a reservation.
  */
  cancel() {
    this._manageService.emit('cancelReservation', {secret: this.reservationid});
  }

  /*This method handles the resending of a magic link if the user requests
  * that a link be re-sent!
  */
  lostEmail() {
    if (this.emailFormControl.valid) {
      this._manageService.emit('resendLink', {email: this.emailFormControl.value});
    }
  }
}
