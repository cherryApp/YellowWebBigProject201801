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
  modalArray: Array<any> = ['default.jpg'];
  tableData: Array<any> = [];
  newRow: any = {};
  currentRow: any = {
    picture: 'default.jpg'
  };
  filePath: string = "default.jpg";
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
    console.log(row);
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
    // A student listát lekérem és bele-pusholom az új rekordot.
    // Ha sikeres választ kaptam a szerverről, kiürítéem az új rekordok objektumát.
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
    
    console.log(row, this.modalArray);
  }

  randomAdd() {
    this.randomRow = {
      "productName": `${this.randomProductNames[Math.floor((Math.random() * this.randomProductNames.length - 1) + 1)]}`,
      "itemCode": `${Math.floor((Math.random() * 1000000) + 1)}`,
      "price": `${Math.floor((Math.random() * 10000) + 1)}`,
      "stock": `${Math.floor((Math.random() * 100) + 1)}`,
      "picture": ''
    }
    this.dataAdd(this.randomRow);
  }
  
}
