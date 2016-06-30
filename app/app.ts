'use strict';

import { Component }                    from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {HomePage} from './pages/home/home';
import {SocketService} from './providers/socket-service/socket-service';

@Component({
  templateUrl: 'build/app.html'
})

export class MyApp {
  root: any;
  constructor(public platform: Platform, public socket: SocketService) {
    this.initializeApp();
    this.root = HomePage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');
    });

     this.socket.initialize();
     this.socket.socketService.subscribe(event => {
         console.log('message received from server... ', event);
     });
  }
}

ionicBootstrap(MyApp, [SocketService], {
  mode: 'ios'
});