import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  loginData: { email: string, pass: string } = {
    email: '',
    pass: ''
  };
  user: any;
  landlordRef: AngularFireObject<any>;
  landlordData: Array<any> = [];
  newRow: any = {};
  keys: Array<string> = [
    "landlordId",
    "name",
    "phone",
    "realEstateId"
  ];
  lastKey: string = "";
  sorts: any = {};
  order: number = 1;
  currentData: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.landlordRef = db.object('landlord');
    this.landlordRef.valueChanges().subscribe(
      values => {
        this.landlordData = [];
        for (var k in values) {
          this.landlordData.push({
            key: k,
            data: values[k]
          });
        }
      }
    )

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

  dataAdd(record: any) {
    this.db.list('landlord').push(record).then(
      r => this.newRow = {}
    );
  }

  dataUpdate(row): void {
    // Rámutatok a távoli adatbázisban az adott kulcsú sorra.
    // Erre hívom meg az update metódust, aminek átadom az új adatokat.
    this.db.object('landlord/' + row.key).update(row.data);
  }

  dataDelete(key: string): void {
    this.db.object('landlord/' + key).remove();
  }

  sort(key): void {
    for (var k in this.sorts) {
      this.sorts[k] = "";
    }
    if (this.lastKey == key) {
      this.order *= -1;
    } else {
      this.order = 1;
    }
    this.sorts[key] = this.order == -1 ? 'up' : 'down';

    this.lastKey = key;
    this.landlordData.sort((a, b) => {
      return a.data[key].toString().localeCompare(b.data[key].toString()) * this.order;
    });
  }
}
