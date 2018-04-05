import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  cars: Array<any>;
  gas: Array<any>;
  drivers: Array<any>;
  fueling: Array<any>;
  data: any = [];
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  tableData: Array<any> = [];
  newRow: any = {};
  keys: Array<string> = [
    "SofőrID",
    "Rendszám",
    "Fogyasztás(l)",
    "Összeg(Ft)"
  ];
  lastKey: string = "";
  sorts: any = {};
  order: number = 1;
  currentData: any;


  constructor(private db: AngularFireDatabase) {

    for (let k of this.keys) {
      this.db.object('drivers').valueChanges().subscribe(value => {
        this.drivers = [];
        for (let i in value) {
          this.drivers.push(value[i]["ID"]);
        }
        console.log(this.drivers);
      });
    }
    for (let k of this.keys) {
      this.db.object('vehicles').valueChanges().subscribe(value => {
        this.cars = [];

        for (let i in value) {
          this.cars.push(value[i]["Rendszám"]);
        }
        console.log(this.cars);
      });
    }
    for (let k of this.keys) {
      this.db.object('fueling').valueChanges().subscribe(value => {
        this.fueling = [];
        for (let i in value) {
          this.fueling.push(value[i]["Összeg(Ft)"]);
        }
        console.log(this.fueling);
      });
    }
    for (let k of this.keys) {
      this.db.object('fueling').valueChanges().subscribe(value => {
        this.gas = [];
        for (let i in value) {
          this.gas.push(value[i]["Üzemanyag(l)"]);
        }
        console.log(this.gas);
      });
    }
  }

  ngOnInit() {
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
    this.tableData.sort((a, b) => {
      return a.data[key].toString().localeCompare(b.data[key].toString()) * this.order;
    });
  }
}
