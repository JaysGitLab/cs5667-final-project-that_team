import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from './registration.service';

/* This component handles user registration requests via an angular form.
*
* This file uses the registration service to handle all socket communications.
*/
@Component({
  selector: 'registration',
  templateUrl: './app/registration/registration.template.html',
  providers: [RegistrationService]
})
export class RegistrationComponent {
  /* Constructor for RegistrationComponent
  *
  * initializes a RegistrationService instance in the _registrationservice
  * attribute.
  */
  constructor(private _registrationservice: RegistrationService) {}

  /* This overrides the ngOnInit function to add functionality.
  *
  * This initializes the fields and sets up the necessary socket hook.
  */
  ngOnInit() {
    //TODO: Initialize fields
    //TODO: Initialize socket hooks with this._registrationservice.on()
    //TODO: emit a signal to get all unavaliable days from server.
  }
}
