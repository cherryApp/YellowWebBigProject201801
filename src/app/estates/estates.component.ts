import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-estates',
  templateUrl: './estates.component.html',
  styleUrls: ['./estates.component.css']
})
export class EstatesComponent implements OnInit {
  loginData: { email: string, pass: string } = {
    email: "",
    pass: ""
  };
  user: any;
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  tableData: Array<any> = [];
  newRow: any = {};
  keys: Array<string> = [
    "address",
    "agentId",
    "area",
    "id",
    "margin",
    "price",
    "status",
  ];
  lastKey: string = "";
  sorts: any = {};
  order: number = 1;
  currentData: any;
  actualRow: any = {};

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    for (let k of this.keys) {
      this.sorts[k] = {};
    }

    // The itemRef: point to student object in the database.
    this.itemRef = db.object('realEstate');

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
    this.afAuth.authState.subscribe(
      user => this.user = user,
      error => console.error(error)
    );
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
    console.log(typeof this.sorts[key]);
    this.lastKey = key;
    this.tableData.sort((a, b) => {
      return a.data[key].toString().localeCompare(b.data[key].toString()) * this.order;
    });
  }

  /**
   * Login with email and password to the firebase cloud.
   * @returns: void;
   */
  login(): void {
    this.afAuth.auth.signInWithEmailAndPassword(
      this.loginData.email,
      this.loginData.pass
    ).then(
      value => console.log(value),
      error => console.error(error)
      );
  }

  /**
   * Frissítjük az adott adat-sort a távoli adatbázisban.
   * @param row {object}: a frissíteni kíván adatsor.
   */
  dataUpdate(row): void {
    // Rámutatok a távoli adatbázisban az adott kulcsú student-re.
    // Erre hívom meg az update metódust, aminek átadom az új adatokat.
    this.db.object('realEstate/' + row.key).update(row.data);
  }

  /**
   * @param {string} key - az törölni kívánt student kulcsa.
  */
  dataDelete(key: string): void {
    // Rámutatok a távoli adatbázisban az adott kulcsú student-re.
    // Erre hívom meg a remove metódust.
    this.db.object('realEstate/' + key).remove();
  }

  /**
   * Új adat felvitele a távoli adatbázisba.
   * @param record - az új adatokat tartalmazó objektum.
   */
  dataAdd(record: any) {
    // A studnet listát lekérem és bele-pusholom az új rekordot.
    // Ha sikeres választ kaptam a szerverről, kiürítéem az új rekordok objektumát.
    this.db.list('realEstate').push(record).then(
      r => this.newRow = {}
    );
  }

  modalData(row) {
    console.log(row.data.price);
    this.actualRow = row.data;
    const margin = parseFloat(this.actualRow.margin);
    const price = parseFloat(this.actualRow.price);
    const area = parseFloat(this.actualRow.area);
    this.actualRow.netIncome = price * margin / 100;
    this.actualRow.grossIncome = (this.actualRow.netIncome * 1.27).toFixed();
    this.actualRow.specificPrice = (price / area).toFixed();
  }


}
