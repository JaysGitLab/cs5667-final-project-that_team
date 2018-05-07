import { Component } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { AdminService } from './admin.service';
import { ErrorStateMatcher } from '@angular/material/core';

/* Error when invalid control is dirty, touched, or submitted.
 * (see: https://material.angular.io/components/input/examples)
*/
export class UsernameMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/* Error when invalid control is dirty, touched, or submitted.
 * (see: https://material.angular.io/components/input/examples)
*/
export class PasswordMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/*
* This component handles admin local authentication requests via angular form and passport.
*/
@Component({
    selector: 'admin',
    templateUrl: './app/admin/admin.template.html',
    providers: [AdminService]
})
export class AdminComponent {
  customInvoiceValue:string = '0';
  reservations:any;
  showList:boolean = false;
  auth: boolean = false;
    dateFilter: any;
    usernameFormControl = new FormControl('', [
        Validators.required
    ]);
    passwordFormControl = new FormControl('', [
        Validators.required
    ]);
    usernameMatcher = new UsernameMatcher();
    passwordMatcher = new PasswordMatcher();
    /*
    * Constructor for AdminComponent
    *
    * initializes a AdminService instance in the _adminservice attribute.
    */
    constructor(private _adminservice: AdminService) {}

    /*
    * This overrides the ngOnInit function to add functionality.
    *
    * Initializes class fields and sets up necessary socket.io hook.
    */
    ngOnInit() {
        this._adminservice.on('message', (message) => {
            console.log(message);
        });

        /***************************AUTH***************************/
        this._adminservice.on('accessFailed', (message) => {
            console.log('accessFailed with message:', message.message);
        });
        this._adminservice.on('userNotFound', (message) => {
            console.log('userNotFound with message:', message);
        });
        this._adminservice.on('badPassword', (message) => {
            console.log('badPassword with message: ', message);
        });
        this._adminservice.on('badUsernamePassword', (message) => {
            console.log('badUsernamePassword with message: ', message);
        });
        this._adminservice.on('adminUserData', (message) => {
            console.log('recieved adminUserData from server:', message);
        });
        this._adminservice.on('authSuccess', (message) => {
          this._adminservice.emit('getReservationList', {});
          this.auth = true;
        });
        /************************************************************/
        /************************EVERYTHING ELSE********************/
        this._adminservice.on('reservationList', (message) => {
          this.reservations = JSON.parse(message);
          for (var reservation of this.reservations) {
            reservation.reservationDate = new Date(reservation.reservationDate);
            reservation.created = new Date(reservation.created);
          }
          this.showList = true;
        });

        this._adminservice.on('statusUpdated', (message) => {
          for (var reservation of this.reservations) {
            if (reservation.secret == message.secret) {
              reservation.status = message.status;
            }
          }
        });
    }

    /*
    * This method handles login form submissions.
    */
    onSubmit(form: NgForm) {
        if (form.valid && this.usernameFormControl.valid && this.passwordFormControl.valid) {
            var submission = JSON.parse(JSON.stringify(form.value));
            submission.username = this.usernameFormControl.value;
            submission.password = this.passwordFormControl.value;
//            console.log(submission);
            this._adminservice.emit('adminLoginRequest', {form: JSON.stringify(submission)});
        }
    }

    /*This function will handle an approve action.
    */
    approve(reservation) {
      console.log('approve ' + reservation.reservationDate.toDateString());
      this._adminservice.emit('updateStatus', {
        secret: reservation.secret,
        status: 'approved'
      });
      this._adminservice.emit('getReservationList', {});
    }

    /*This function will handle all invoice sending.
    */
    invoice(form: NgForm, reservation) {
      console.log('invoice ' + reservation.reservationDate.toDateString() + " for " + form.value.invoiceValue);
      if (form.valid) {
        if (form.value.invoiceValue != '0') {
          var cost = (form.value.invoiceValue == 'custom') ? this.customInvoiceValue : form.value.invoiceValue;
          this._adminservice.emit('invoiceUser', {
            reservation: reservation,
            amount: cost
          });
        }
        this._adminservice.emit('updateStatus', {
          secret: reservation.secret,
          status: 'invoiced'
        });
        this._adminservice.emit('getReservationList', {});
      }
    }
}
