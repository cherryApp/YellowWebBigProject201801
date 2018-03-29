import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  data: any = [];
  newTrip: any = {
    id: "",
    personId: "",
    carId: "",
    date: "",
    distance: "",
    actConsumption: "",
    pstationIds: ""
  };
  users: any;
  cars: any;
  ps: any;
  maxID: any = "0";
  more: any = {};
  list: boolean = false;
  constructor(private db: AngularFireDatabase) {
    this.db.object('uzemanyag/trips').valueChanges().subscribe(value => {
      this.data = [];
      for (let i in value) {
        this.data.push({ key: i, adat: value[i] });
        if (parseInt(this.maxID) <= parseInt(value[i].id)) {
          this.maxID = parseInt(value[i].id) + 1;
          console.log(this.maxID);
        }
      }
    });
    this.db.object('uzemanyag/people').valueChanges().subscribe(value => {
      this.users = [];
      for (let i in value) {
        this.users.push({ key: i, adat: value[i] });
      }
      console.log(this.users);
    });
    this.db.object('uzemanyag/cars').valueChanges().subscribe(value => {
      this.cars = [];
      for (let i in value) {
        this.cars.push({ key: i, adat: value[i] });
      }
      console.log(this.cars);
    });
    this.db.object('uzemanyag/pstations').valueChanges().subscribe(value => {
      this.ps = [];
      for (let i in value) {
        this.ps.push({ key: i, adat: value[i] });
      }
      console.log(this.ps);
    });
  }
  save() {
    this.newTrip.id = "" + this.maxID;
    this.db.list('uzemanyag/trips').push(this.newTrip);
  }
  deleteRow(key) {
    this.db.object('uzemanyag/trips/' + key).remove();
  }
  details(row) {
    this.list = true;
    let x = row.adat;
    this.more = {};
    for (let i of this.users) {
      if (parseInt(i.adat.id) == parseInt(row.adat.personId)) {
        this.more.user = i.adat;
      }
    }
    for (let i of this.cars) {
      if (parseInt(i.adat.id) == parseInt(row.adat.carId)) {
        this.more.car = i.adat;
      }
    }
    for (let i of this.ps) {
      if (parseInt(i.adat.id) == parseInt(row.adat.pstationIds)) {
        this.more.ps = i.adat;
      }
    }
    console.log(this.more);
  }
  ngOnInit() {
  }

}
