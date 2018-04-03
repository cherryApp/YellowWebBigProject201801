import { Component, OnInit, TrackByFunction } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { isNumber } from 'util';
import { SortingService } from '../sorting.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: []
})
export class ProductsComponent implements OnInit {
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
    "productName",
    "itemCode",
    "price",
    "stock"
  ];
  randomProductNames: Array<string> = ["Fender Stratocaster", "Fender Telecaster", "Fender Jaguar", "Fender Mustang", "Jackson Dinky", "Jackson Soloist", "Jackson Warrior", "Jackson Kelly", "Jackson King V", "Gibson Les Paul", "Gibson SG", "Gibson Flying V", "Gibson Explorer", "Gibson Firebird", "Friedman Dirty Shirley", "Friedman Brown Eye", "Peavey 5150", "Peavey 6606", "Marshall JCM 800", "Marshall JCM 900", "Marshall JCM 2000", "Marshall JMP-1", "Orange Micro Terror", "Orange Dual Terror", "Orange Tiny Terror", "Blackstar Artist Series", "Blackstar Artisan Series", "Blackstar Venue Series",
  ];
  randomItemCode: Array<string> = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "N", "X", "Y", "Z"];
  randomRow: any = {};

  sorts: any = {};
  currentData: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    public sortingService: SortingService
  ) {
    for (let k of this.keys) {
      this.sorts[k] = {};
    }

    this.itemRef = db.object('products');

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
    this.afAuth.authState.subscribe(
      user => this.user = user,
      error => console.error(error)
    );
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
    this.db.object('products/' + row.key).update(row.data);
  }

  /**
   * @param {string} key - az törölni kívánt student kulcsa.
  */
  dataDelete(key: string): void {
    // Rámutatok a távoli adatbázisban az adott kulcsú student-re.
    // Erre hívom meg a remove metódust.
    this.db.object('products/' + key).remove();
  }

  /**
   * Új adat felvitele a távoli adatbázisba.
   * @param record - az új adatokat tartalmazó objektum.
   */
  dataAdd(record: any) {
    // A studnet listát lekérem és bele-pusholom az új rekordot.
    // Ha sikeres választ kaptam a szerverről, kiürítéem az új rekordok objektumát.
    this.db.list('products').push(record).then(
      r => this.newRow = {}
    );
  }

  randomAdd() {
    let generateRandomItemCode = "";
    for (let i = 0; i < 4; i++) {
      generateRandomItemCode += this.randomItemCode[Math.floor((Math.random() * this.randomItemCode.length - 1) + 1)];
    }
    this.randomRow = {
      "productName": `${this.randomProductNames[Math.floor((Math.random() * this.randomProductNames.length - 1) + 1)]}`,
      "itemCode": `${Math.floor((Math.random() * 10000) + 1)}${generateRandomItemCode}`,
      "price": `${Math.floor((Math.random() * 10000) + 1)} $`,
      "stock": `${Math.floor((Math.random() * 100) + 1)}`
    }
    this.dataAdd(this.randomRow);
  }

}
