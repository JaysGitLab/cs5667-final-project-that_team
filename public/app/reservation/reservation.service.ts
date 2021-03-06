import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const io = require('socket.io-client');

/* This class handles the socket interface for the Registration module.
*
* This also functions as a basic wrapper for a socket.io connection.
* Note: it is Injectable so it can be injected as a service in RXJS
*/
@Injectable()
export class ReservationService {
  private socket: any;

  constructor() {
    this.socket = io();
  }
  /* This method will respond to all socket.on calls and pass them through. */
  on(eventName, callback) {
    if (this.socket) {
      this.socket.on(eventName, function(data) {
        callback(data);
      });
    }
  };
  /* This method will respond to all socket.emit calls and pass them through. */
  emit(eventName, data) {
    if (this.socket) {
      this.socket.emit(eventName, data);
      console.log(`Emitting ${eventName} with data ${data}.`);
    }
  };
  /* This method will respond to socket.removeListener calls. */
  removeListener(eventName) {
    if (this.socket) {
      this.socket.removeListener(eventName);
    }
  };
}
