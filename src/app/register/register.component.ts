import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { summaryFileName } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  cars: Array<any> = [];
  gas: Array<any> = [];
  drivers: Array<any> = [];
  fueling: Array<any> = [];
  data: any = [];
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  tableData: Array<any> = [];
  newRow: any = {};
  keys: Array<string> = [
    "SofőrID",
    "Rendszám",
    "Üzemanyag fogyás (l)",
    "Összeg(Ft)"
  ];
  lastKey: string = "";
  sorts: any = {};
  order: number = 1;
  currentData: any;
  summary: Array<any> = [];
  summaryObjects: Array<object> = [[], [], [], [], []];




  constructor(private db: AngularFireDatabase) {
    this.db.object('drivers').valueChanges().subscribe(value => {
      for (let i in value) {
        this.drivers.push({ "SofőrID": value[i].ID });
      }
    });
    this.db.object('vehicles').valueChanges().subscribe(value => {
      for (let i in value) {
        this.cars.push(value[i]["Rendszám"]);
      }
      this.summary.push(this.cars);

    });
    this.db.object('fueling').valueChanges().subscribe(value => {
      for (let i in value) {
        this.fueling.push(value[i]["Összeg(Ft)"]);
      }
      this.summary.push(this.fueling);

    });
    this.db.object('fueling').valueChanges().subscribe(value => {
      for (let i in value) {
        this.gas.push(value[i]["Üzemanyag(l)"]);
      }
      this.summary.push(this.gas);
      this.createObjects();
    });
  }

  createObjects(): void {
    for (let i in this.drivers) {
      this.drivers[i].Rendszám = this.summary[0][i];
      this.drivers[i]["Fogyasztás(l)"] = this.summary[1][i];
      this.drivers[i]["Összeg(Ft)"] = this.summary[2][i];
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
