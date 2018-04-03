import { Component, OnInit, TrackByFunction, ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { isNumber } from 'util';
import { SortingService } from '../sorting.service';
import { ViewChild } from '@angular/core';

declare var jQuery:any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: []
})
export class ProductsComponent implements OnInit {
  @ViewChild('myModal') myModal:ElementRef;

  loginData: { email: string, pass: string } = {
    email: "",
    pass: ""
  };
  user: any;
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  modalArray: Array<any> = [{picture: 'default.jpg'}];
  tableData: Array<any> = [];
  newRow: any = {};
  currentRow: any = {
    picture: 'default.jpg'
  };
  filePath: string = "default.jpg";
  keysAlias: Array<string> = [
    "Product Name",
    "Product Code",
    "Price",
    "Stock (pcs)",
    "Picture Filename",
    "Details"
  ];
  keys: Array<string> = [
    "productName",
    "itemCode",
    "price",
    "stock",
    "picture",
    "details"
  ];
  randomProductNames: Array<string> = ["Fender Stratocaster", "Fender Telecaster", "Fender Jaguar", "Fender Mustang", "Jackson Dinky", "Jackson Soloist", "Jackson Warrior", "Jackson Kelly", "Jackson King V", "Gibson Les Paul", "Gibson SG", "Gibson Flying V", "Gibson Explorer", "Gibson Firebird", "Friedman Dirty Shirley", "Friedman Brown Eye", "Peavey 5150", "Peavey 6606", "Marshall JCM 800", "Marshall JCM 900", "Marshall JCM 2000", "Marshall JMP-1", "Orange Micro Terror", "Orange Dual Terror", "Orange Tiny Terror", "Blackstar Artist Series", "Blackstar Artisan Series", "Blackstar Venue Series",
];
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
    );
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
    record.picture = this.filePath;
    this.db.list('products').push(record).then(
      r => this.newRow = {}
    );
    this.filePath = 'default.jpg';
  }

  changeLog(file) {
    this.filePath = file.value.substring(12);
  }

  openModal(row){
    //open modal using jQuery
    this.modalArray = [];
    this.modalArray.push(row.data);
    jQuery(this.myModal.nativeElement).modal('show');
  }

  randomAdd() {
    this.randomRow = {
      "productName": `${this.randomProductNames[Math.floor((Math.random() * this.randomProductNames.length - 1) + 1)]}`,
      "itemCode": `${Math.floor((Math.random() * 1000000) + 1)}`,
      "price": `${Math.floor((Math.random() * 10000) + 1)}`,
      "stock": `${Math.floor((Math.random() * 100) + 1)}`,
      "picture": 'default.jpg',
      "details": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
    this.dataAdd(this.randomRow);
  }

}
