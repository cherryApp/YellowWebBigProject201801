import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  filterParts: Array<any>;
  parts: Array<any>;

  constructor(private afAuth: AngularFireAuth) {

  }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
  }


  search(searchInput) {
    this.filterParts = [];
    if (searchInput != "") {
      this.parts.forEach(element => {
        if (element.partNumber.toLowerCase().indexOf(searchInput.toLowerCase() >= 0)) {
          this.filterParts.push(element);
        }
      });
    } else {
      this.filterParts = this.parts;
    }
  }

}