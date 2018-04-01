import { Component, OnInit, TrackByFunction } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { SortingService } from '../sorting.service';
import { Places } from './places';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: []
})
export class CustomersComponent implements OnInit {
  loginData: { email: string, pass: string } = {
    email: "",
    pass: ""
  };
  user: any;
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  tableData: Array<any> = [];
  newRow: any = {};
  randomRow: any = {};
  keys: Array<string> = [
    "customerId",
    "customerName",
    "age",
    "address"
  ];
  places1: Places = new Places();
  placesRand: Array<string> = this.places1.placesArray;
  namesRand: Array<string> = this.places1.namesArray;
  lastNamesRand: Array<string> = this.places1.lastNamesArray;
  lastKey: string = "";
  sorts: any = {};
  order: number = 1;
  currentData: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    public sortingService: SortingService
  ) {
    for (let k of this.keys) {
      this.sorts[k] = {};
    }

    this.itemRef = db.object('customers');

    this.itemRef.valueChanges().subscribe(
      values => {
        this.tableData = [];

        for (var k in values) {
          this.tableData.push({
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


  /**
   * Login with email and password to the firebase cloud.
   * @returns: void;
   */
  login(): void {
    this.afAuth.auth.signInWithEmailAndPassword(
      this.loginData.email,
      this.loginData.pass
    ).then(
      value => console.log(value),
      error => console.error(error)
    );
  }

  /**
   * Frissítjük az adott adat-sort a távoli adatbázisban.
   * @param row {object}: a frissíteni kíván adatsor.
   */
  dataUpdate(row): void {
    this.db.object('customers/' + row.key).update(row.data);
  }

  /**
   * @param {string} key - az törölni kívánt student kulcsa.
  */
  dataDelete(key: string): void {
    this.db.object('customers/' + key).remove();
  }

  /**
   * Új adat felvitele a távoli adatbázisba.
   * @param record - az új adatokat tartalmazó objektum.
   */
  dataAdd(record: any) {
    this.db.list('customers').push(record).then(
      r => this.newRow = {}
    );
  }
  /**
   * generate a random customer
   */
  randomAdd() {
    this.randomRow = {
      "customerId": `${Math.floor((Math.random() * 10000) + 1)}`,
      "customerName": `${this.namesRand[Math.floor((Math.random() * this.namesRand.length - 1) + 1)]} ${this.lastNamesRand[Math.floor((Math.random() * this.lastNamesRand.length - 1) + 1)]}`,
      "age": `${Math.floor((Math.random() * 100) + 1)}`,
      "address": `${this.placesRand[Math.floor((Math.random() * this.placesRand.length - 1) + 1)]}`
    }
    this.dataAdd(this.randomRow);
  }
}
