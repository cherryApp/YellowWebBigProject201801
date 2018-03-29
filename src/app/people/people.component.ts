import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  constructor(private db: AngularFireDatabase) {
    this.db.object('uzemanyag').valueChanges().subscribe(value => console.log(value['people']));
  }

  ngOnInit() {
  }

}
