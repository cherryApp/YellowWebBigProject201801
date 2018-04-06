import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { MedicinesService } from './src/app/medicines.service';
import { PensionersService } from './src/app/pensioners.service';
import { NursesService } from './src/app/nurses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loginData: { email: string, pass: string } = {
    email: "",
    pass: ""
  };
  user: any;



  constructor(
    private afAuth: AngularFireAuth,
    private mService: MedicinesService,
    private pService: PensionersService,
    private nService: NursesService,
  ) {

  }
  ngOnInit() {
    this.afAuth.authState.subscribe(
      user => this.user = user,
      error => console.error(error)
    );
  }

  login(): void {
    this.afAuth.auth.signInWithEmailAndPassword(
      this.loginData.email,
      this.loginData.pass
    ).then(
      value => console.log(value),
      error => console.error(error)
    );
  }


  title = 'app';
}
