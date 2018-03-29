import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-pstations',
  templateUrl: './pstations.component.html',
  styleUrls: ['./pstations.component.css']
})
export class PstationsComponent implements OnInit {

  constructor(private db: AngularFireDatabase) {
    this.db.object('uzemanyag').valueChanges().subscribe(value => console.log(value['pstations']));
  }

  ngOnInit() {
  }

}
