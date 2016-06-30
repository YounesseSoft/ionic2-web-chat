'use strict';

import { Component }                    from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {HomePage} from './pages/home/home';


@Component({
  templateUrl: 'build/app.html'
})

export class MyApp {
  root: any;
  constructor(public platform: Platform) {
    this.initializeApp();
    this.root = HomePage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');
    });
  }
}

ionicBootstrap(MyApp, [], {
  mode: 'ios'
});