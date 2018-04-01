import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginData: { email: string, pass: string } = {
    email: "",
    pass: ""
  };
  user: any;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

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

}
