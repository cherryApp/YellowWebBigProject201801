import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: {email: string, pass: string} = {
    email: "",
    pass: ""
  };
  user: any;

  constructor(
    private afAuth: AngularFireAuth,
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

  logout() {
    this.afAuth.auth.signOut();
  }

}
