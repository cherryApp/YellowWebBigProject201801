import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from '@firebase/util';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-pstations',
  templateUrl: './pstations.component.html',
  styleUrls: ['./pstations.component.css']
})
export class PstationsComponent implements OnInit {


  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  tableData: Array<any> = [];
  newRow: any = {};
  keys: Array<string> = ['Id', 'Company', 'Location', 'Diesel (HUF)', 'Petrol (HUF)'];
  lastKey: string = "";
  sorts: any = {};
  order: number = 1;
  data: any;
  select: Array<any> = ['location', 'company', 'dieselPrice', 'petrolPrice'];
  searchInput: string;


  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.db.object('uzemanyag').valueChanges().subscribe(value1 => console.log(value1['pstations']));

    // végig megyek a fejléc adatokon, és a korábban rendezett adatokat kiürítem
    for (let k of this.keys) {
      this.sorts[k] = {};
    }
    // az itemRef az üzemanyag adatbázison belül a pstations aladatbázisra mutat
    this.itemRef = db.object('uzemanyag/pstations');

    //pstations objektum változásainak figyelése
    //változás esetén először kiüríti a tableData tömböt, h. a korábban hozzáadott sorok ne kerüljenek be újra az adatbázisba
    //majd hozzáadom a tableData tömbhöz az új objektumot

    this.itemRef.valueChanges().subscribe(values => {
      this.tableData = [];

      for (let k in values) {
        this.tableData.push({ key: k, adat: values[k] }); //az egyes pstations adatsorok így néznek ki: {key: {id:0, dieselPrice: 450, location: "bp", petrolPrice: 350 }}

      }
      console.log(this.tableData);
    });
  }

  ngOnInit() {
  }

  sortTable(key): void {

    //kiürítem a korábbi rendezést
    //majd beállítom a rendezés sorrendjét(csökkenő v. növekvő)
    for (let k in this.sorts) {
      this.sorts[k] = "";
    }
    if (this.lastKey == key) {
      this.order *= -1;
    }
    else {
      this.order = 1;
    }
    //this.sorts[key] = this.order == -1 ? 'up' : 'down';
    this.lastKey = key;
    this.tableData.sort((a, b) => {
      return a.adat[key].toString().localeCompare(b.adat[key].toString()) * this.order;
    });
  }

  //Update - adatok módosítása a pStation adatbázisban
  dataUpdate(row): void {
    this.db.object('uzemanyag/pstations/' + row.key).update(row.adat);
  }

  //Delete - adatok törlése a pStation adatbázisban
  dataDelete(key: string): void {
    this.db.object('uzemanyag/pstations/' + key).remove();
  }

  //Create - új adatsorok hozzáadása a pStation adatbázishoz

  dataAdd(record) {
    this.db.list('uzemanyag/pstations').push(record).then(
      r => this.newRow = {}
    );
  }
  search() {
    let input, filter, table, tr, td, i;
    input = document.getElementById('search');
    filter = input.value.toLowerCase();
    table = document.getElementsByTagName('table');
    tr = table.getElementsByTagNames('tr');




    switch (this.select) {
      case this.select[0]:
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagNames[2];
          if (td) {
            if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }
        break;
      case this.select[1]:
        break;
      case this.select[2]:
        break;
      case this.select[3]:
        break;


    }
  }


}
