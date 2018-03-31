import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgStyle } from '@angular/common';

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
    pstationIds: "",
    cost: 0
  };
  users: any;
  cars: any;
  ps: any;
  maxID: any = "0";
  more: any = {};
  list: boolean = false;
  car: any = "";
  cons: any;
  stat: any;
  drive: any;
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
    let price = 0;
    this.list = false;
    this.newTrip.id = "" + this.maxID;
    this.newTrip.carId = this.cons.split(",")[0];
    this.newTrip.pstationIds = this.stat.split(",")[0];
    this.newTrip.personId = this.drive.split(",")[1];
    this.newTrip.actConsumption = (this.newTrip.distance / 100 * this.cons.split(",")[1]).toFixed(2);
    if (this.cons.split(",")[2] == "benzin") {
      price = this.stat.split(",")[2];
      this.newTrip.cost = this.newTrip.actConsumption * this.stat.split(",")[2];
    } else {
      price = this.stat.split(",")[1];
      this.newTrip.cost = this.newTrip.actConsumption * this.stat.split(",")[1];
    }
    if (this.cons.split(",")[3] - 10 > (this.newTrip.actConsumption)) {
      this.db.object('uzemanyag/cars/' + this.cons.split(",")[4]).update({ actfuel: (parseFloat(this.cons.split(",")[3]) - parseFloat(this.newTrip.actConsumption)).toFixed(2) });
    } else {
      //CSAK AKKOR TANKOL HA KEVSEBB MINT 10 liter maradna és csak 10L-ig tankol
      let dif = this.newTrip.actConsumption - (this.cons.split(",")[3] - 10);
      this.db.object('uzemanyag/cars/' + this.cons.split(",")[4]).update({ actfuel: 10 });
      this.db.object('uzemanyag/people/' + this.drive.split(",")[0]).update({ money: parseInt(this.drive.split(",")[2]) - price * dif });
    }

    this.db.list('uzemanyag/trips').push(this.newTrip);
    this.car = "car";
    setTimeout(() => {
      this.car = "";
    }, 1000);
    /*  this.db.list('uzemanyag/cars').push({ avgConsumption: 15, type: "Alfa Romeo", motorType: "diesel", id: 1, tank: 75, actfuel: 37 }); */
    /*  this.db.list('uzemanyag/people').push({ email: "nagygabor@gmail.com", city: "Hatvan", firstName: "Gábor", lastName: "Nagy", money: 175000, id: 1 }); */
    /*  this.db.list('uzemanyag/pstations').push({ avgConsumption: 15, type: "Alfa Romeo", motorType: "diesel", id: 1, tank: 75, actfuel: 37 }); */
  }
  deleteRow(key) {
    this.list = false;
    this.db.object('uzemanyag/trips/' + key).remove();
    /* this.db.object('uzemanyag/cars/-L8pgpd0CJw8zciue3bT').remove(); */
    /*  this.db.object('uzemanyag/people/-L8pmXzbYcaLh7e1ton5').remove(); */
    /* this.db.object('uzemanyag/cars/-L8pgpd0CJw8zciue3bT').remove(); */
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
      if (parseInt(i.adat.Id) == parseInt(row.adat.pstationIds)) {
        this.more.ps = i.adat;
      }
    }
    console.log(this.more);
  }
  ngOnInit() {
  }

}
