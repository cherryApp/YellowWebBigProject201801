import { Component, OnInit, TrackByFunction } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pensioners',
  templateUrl: './pensioners.component.html',
  styleUrls: ['./pensioners.component.css']
})
export class PensionersComponent implements OnInit {

  keys: Array<string> = [
    "medicines",
    "name"
  ];
  sorts: any = {};
  itemRef: AngularFireObject<any>;
  tableData: Array<any> = [];
  lastKey: string = "";
  order: number = 1;
  newRow: any = {};

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    for (let k of this.keys) {
      this.sorts[k] = {};
    }

    this.itemRef = db.object('Pensioners');

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
    this.db.object('Pensioners/' + row.key).update(row.data);
  }

  deleteData(key: string): void {
    this.db.object('Pensioners/' + key).remove();
  }

  addData(record: any) {
    this.db.list('Pensioners').push(record).then(
      r => this.newRow = {}
    );
  }
}
