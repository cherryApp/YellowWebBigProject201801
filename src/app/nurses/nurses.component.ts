import { Component, OnInit } from '@angular/core';
import { NursesService } from '../nurses.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';


@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.component.html',
  styleUrls: ['./nurses.component.css']
})
export class NursesComponent implements OnInit {
  keys: Array<string> = [
    "pensioners",
    "name"
  ];
  sorts: any = {};
  afo: AngularFireObject<any>;
  tableData: Array<any> = [];
  lastKey: string = "";
  order: number = 1;
  newRow: any = {};

  constructor(
    private nursesService: NursesService,
    private afs: AngularFireAuth,
    private db: AngularFireDatabase
  ) {

    for (let k of this.keys) {
      this.sorts[k] = {};
    }

    this.afo = db.object('Nurses');

    this.afo.valueChanges().subscribe(
      values => {
        this.tableData = [];
        console.log(values);
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

  updateData(row): void {
    this.db.object('Nurses/' + row.key).update(row.data);

  }

  deleteData(key: string): void {
    this.db.object('Nurses/' + key).remove();
  }

  addData(record: any) {
    this.db.list('Nurses').push(record).then(
      r => this.newRow = {}
    );
  }
}

