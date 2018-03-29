import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  constructor(private db: AngularFireDatabase) {
    this.db.object('uzemanyag').valueChanges().subscribe(value => console.log(value['trips']));
  }

  ngOnInit() {
  }

}
