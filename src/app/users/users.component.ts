import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from '@firebase/util';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: any;
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  tableData: Array<any> = [];
  newRow: any = {};
  keys: Array<string> = [
    "id",
    "name",
    "email",
    "city"
  ];
  lastKey: string = "";
  sorts: any = {};
  order: number = 1;
  currentData: any;

  constructor(private db: AngularFireDatabase) {
    for (let k of this.keys) {
      this.sorts[k] = {};
    }

    // The itemRef: point to student object in the database.
    this.itemRef = db.object('student');

    // Watch changes of student object.
    this.itemRef.valueChanges().subscribe(
      values => {
        // If new data arrives, wipe tableData array.
        this.tableData = [];

        // Push new rows to the tableData with key and value.
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

  /**
   * Login with email and password to the firebase cloud.
   * @returns: void;
   */

  /**
   * Frissítjük az adott adat-sort a távoli adatbázisban.
   * @param row {object}: a frissíteni kíván adatsor.
   */
  dataUpdate(row): void {
    // Rámutatok a távoli adatbázisban az adott kulcsú student-re.
    // Erre hívom meg az update metódust, aminek átadom az új adatokat.
    this.db.object('student/' + row.key).update(row.data);
  }

  /**
   * @param {string} key - az törölni kívánt student kulcsa.
  */
  dataDelete(key: string): void {
    // Rámutatok a távoli adatbázisban az adott kulcsú student-re.
    // Erre hívom meg a remove metódust.
    this.db.object('student/' + key).remove();
  }

  /**
   * Új adat felvitele a távoli adatbázisba.
   * @param record - az új adatokat tartalmazó objektum.
   */
  dataAdd(record: any) {
    // A studnet listát lekérem és bele-pusholom az új rekordot.
    // Ha sikeres választ kaptam a szerverről, kiürítéem az új rekordok objektumát.
    this.db.list('student').push(record).then(
      r => this.newRow = {}
    );
  }
}
