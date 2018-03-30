import { Component, OnInit, TrackByFunction } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: []
})
export class CustomersComponent implements OnInit {
  loginData: { email: string, pass: string } = {
    email: "",
    pass: ""
  };
  user: any;
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  tableData: Array<any> = [];
  newRow: any = {};
  randomRow: any = {};
  keys: Array<string> = [
    "customerId",
    "customerName",
    "age",
    "address"
  ];
  randomCityNames: Array<string> = ["Aldwall", "Crystalston", "Fallhill", "Coldholt", "Marshton", "Roseness", "Marbleham", "Starrybridge", "Greenspring", "Wellspring", "Hedgebourne", "Fairdragon", "Northnesse", "Spellborough", "Silversage", "Lorwald", "Icesage", "Icemarble", "Oldgold", "Blueviolet", "Fayhaven", "Starryhall", "Wellness", "Stonespell", "Shadowwyvern", "Flowerdell", "Merribush", "Fogmere", "Riverhedge", "Roseby", "Grasskeep",];
  randomFirstNames: Array<string> = ["Sophey", "Eberto", "Marcela", "Penny", "Karita", "Artair", "Hyacinthie", "Lucais", "Sherill", "Merrill", "Crissy", "Red", "Sidoney", "Trefor", "Carey", "Nobe", "Isahella", "Pacorro", "Debee", "Hastie", "Willetta", "Hanan", "Dinny", "Edd", "Jeannette", "Rufe", "Stephine", "Jaime", "Sibylle", "Horatio", "Tybie"];
  randomLastNames: Array<string> = ["Swartz", "Holmberg", "Bedard", "Zane", "Moravcsik", "Koutrakis", "Haykov", "Russ", "Picasso", "Dambry", "Lacerda", "Nasca", "Monzac", "Akiba", "Wentworth", "Alix", "Howells", "Priest", "Chang", "Field-daly", "Dininny", "Kirscht", "Taborsky", "Fung", "Oliva", "Deland", "Barcus", "Vanheeckeren", "Dorfman", "Genetti", "Birnbaum"]

  lastKey: string = "";
  sorts: any = {};
  order: number = 1;
  currentData: any;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    for (let k of this.keys) {
      this.sorts[k] = {};
    }

    this.itemRef = db.object('customers');

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

  sort(key): void {
    /**
     * customerId must be a number to sort
     */
    if (key == "customerId") {
      parseInt(key);
    } else { }

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
    this.db.object('customers/' + row.key).update(row.data);
  }

  /**
   * @param {string} key - az törölni kívánt student kulcsa.
  */
  dataDelete(key: string): void {
    this.db.object('customers/' + key).remove();
  }

  /**
   * Új adat felvitele a távoli adatbázisba.
   * @param record - az új adatokat tartalmazó objektum.
   */
  dataAdd(record: any) {
    console.log(record);
    this.db.list('customers').push(record).then(
      r => this.newRow = {}
    );
  }
  /**
   * generate a random customer
   */
  randomAdd() {
    this.randomRow = {
      "customerId": `00${Math.floor((Math.random() * 1000) + 1)}`,
      "customerName": `${this.randomFirstNames[Math.floor((Math.random() * 30) + 1)]} ${this.randomLastNames[Math.floor((Math.random() * 30) + 1)]}`,
      "age": `${Math.floor((Math.random() * 100) + 1)}`,
      "address": `${this.randomCityNames[Math.floor((Math.random() * 30) + 1)]}`
    }
    this.dataAdd(this.randomRow);
  }
}
