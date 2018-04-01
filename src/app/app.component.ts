import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loginData: { email: string, pass: string } = {
    email: "",
    pass: ""
  };
  user: any;
  constructor(
    private afAuth: AngularFireAuth,
  ) {

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
  ngOnInit() {
    this.afAuth.authState.subscribe(
      user => this.user = user,
      error => console.error(error)
    );
  }

}
