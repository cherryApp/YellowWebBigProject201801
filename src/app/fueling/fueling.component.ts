import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-fueling',
  templateUrl: './fueling.component.html',
  styleUrls: ['./fueling.component.css']
})
export class FuelingComponent implements OnInit {
  fueling: any;
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  tableData: Array<any> = [];
  newRow: any = {};
  keys: Array<string> = [
    "Összeg(Ft)",
    "Üzemanyag(l)",
    "Időpont",
    "Megtett út(km)"
  ];
  lastKey: string = "";
  sorts: any = {};
  order: number = 1;
  currentData: any;

  constructor(private db: AngularFireDatabase) {
    for (let k of this.keys) {
      this.sorts[k] = {};
    }

    this.itemRef = db.object('fueling');

    this.itemRef.valueChanges().subscribe(values => {

      this.tableData = [];

      for (var k in values) {
        this.tableData.push({
          key: k,
          data: values[k]
        });
      }
    });

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

  dataUpdate(row): void {
    this.db.object('fueling/' + row.key).update(row.data);
  }

  dataDelete(key: string): void {
    this.db.object('fueling/' + key).remove();
  }

  dataAdd(record: any) {
    this.db.list('fueling').push(record).then(
      r => this.newRow = {}
    );
  }
}
