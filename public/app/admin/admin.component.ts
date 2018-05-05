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

/*
* This component handles admin local authentication requests via angular form and passport.
*/
@Component({
    selector: 'admin',
    templateUrl: './app/admin/admin.template.html',
    providers: [AdminService]
})
export class AdminComponent {
    dateFilter: any;
    usernameFormControl = new FormControl('', [
        Validators.required
    ]);
    usernameMatcher = new UsernameMatcher();

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
    }

    /*
    * This method handles login form submissions.
    */
    onSubmit(form: NgForm) {
        if (form.valid && this.usernameFormControl.valid) {
            var submission = JSON.parse(JSON.stringify(form.value));
            submission.uname = this.usernameFormControl.value;
            this._adminservice.emit('adminLoginRequested', {form: JSON.stringify(submission)});
        }
    }
}
