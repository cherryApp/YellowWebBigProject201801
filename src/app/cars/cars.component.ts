import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  constructor(private db: AngularFireDatabase) {
    this.db.object('uzemanyag').valueChanges().subscribe(value => console.log(value, value['cars']));
  }

  ngOnInit() {
  }

}
