import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { isNumber } from 'util';
import { SortingService } from '../sorting.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: []
})
export class OrdersComponent implements OnInit {
  loginData: { email: string, pass: string } = {
    email: "",
    pass: ""
  };
  user: any;

  customerRef: AngularFireObject<any>;
  customer: Observable<any>;
  customerData: Array<any> = [];

  productRef: AngularFireObject<any>;
  product: Observable<any>;
  productData: Array<any> = [];

  orderRef: AngularFireObject<any>;
  ordering: Observable<any>;
  orderData: Array<any> = [];

  newRow: any = { products: [], modTime: "" };
  newProduct: any = {};
  keys: Array<string> = [
    "orderID",
    "customerID",
    "status",
    "modTime",
    "lastModdedBy"
  ];
  keys1: Array<string> = [
    "status",
    "modTime",
    "lastModdedBy"
  ];
  lastKey: string = "";
  sorts: any = {};
  order: number = 1;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    public sortingService: SortingService
  ) {
    for (let k of this.keys) {
      this.sorts[k] = {};
    }

    // The itemRef: point to student object in the database.
    this.productRef = db.object('products');

    // Watch changes of student object.
    this.productRef.valueChanges().subscribe(
      values => {
        // If new data arrives, wipe tableData array.
        this.productData = [];

        // Push new rows to the tableData with key and value.
        for (let i in values) {
          this.productData.push({
            key: i,
            data: values[i]
          });
        }
      }
    )
    this.customerRef = db.object('customers');
    // Watch changes of customer object.
    this.customerRef.valueChanges().subscribe(
      values => {
        // If new data arrives, wipe customerData array.
        this.customerData = [];

        // Push new rows to the customerData with key and value.
        for (let j in values) {
          this.customerData.push({
            key: j,
            data: values[j]
          });
        }
      }
    )
    this.orderRef = db.object('orders');
    // Watch changes of customer object.
    this.orderRef.valueChanges().subscribe(
      values => {
        // If new data arrives, wipe customerData array.
        this.orderData = [];

        // Push new rows to the customerData with key and value.
        for (var j in values) {
          this.orderData.push({
            key: j,
            data: values[j]
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
    row.data.modTime = new Date();
    row.data.lastModdedBy = this.user.email;
    this.db.object('orders/' + row.key).update(row.data);

  }

  /**
   * @param {string} key - az törölni kívánt student kulcsa.
  */
  dataDelete(key: string): void {
    // Rámutatok a távoli adatbázisban az adott kulcsú student-re.
    // Erre hívom meg a remove metódust.
    this.db.object('orders/' + key).remove();
  }


  dataAdd(record: any) {
    // A studnet listát lekérem és bele-pusholom az új rekordot.
    // Ha sikeres választ kaptam a szerverről, kiürítéem az új rekordok objektumát.
    let d: any = new Date();
    this.newRow.status = "pending";
    this.newRow.modTime = d;
    this.newRow.lastModdedBy = this.user.email;
    this.db.list('orders').push(record).then(
      r => this.newRow = { products: [] }
    );
    //console.log(this.newRow);
    //this.newRow = { products: [] };

  }

  addProduct(data: any) {
    this.newRow.products.push(data);
    this.newProduct = {};
    console.log(this.newRow);
  }

  updateProduct(i: number) {
    let newNum: any = document.getElementById('newQ');
    this.newRow.products[i].quantity = parseInt(newNum.value);
  }

  deleteProduct(i: number) {
    this.newRow.products.splice(i, 1);
  }

  updateRecordProduct(row: any, i: number) {
    let newerNum: any = document.getElementById('newerQ');
    row.data.products[i].quantity = parseInt(newerNum.value);
    this.db.object('orders/' + row.key).update(row.data);
  }

  deleteRecordProduct(row: any, i: number) {
    row.data.products.splice(i, 1);
    this.db.object('orders/' + row.key).update(row.data);
  }
}