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

  user: any; //?
  itemRef: AngularFireObject<any>; //?
  item: Observable<any>; //?
  tableData: Array<any> = [];
  newRow: any = {};
  keys: Array<string> = ['id', 'PetrolStationCompanyGroup', 'location', 'dieselPrice', 'petrolPrice'];
  petrolstationUrls: any = {
    mol: 'https://pbs.twimg.com/profile_images/378800000474004977/cf7c3082d7151bad59c596ac0def6604.png',
    omv: 'https://crunchbase-production-res.cloudinary.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1446785794/xzqjiv2ze4u1x23gxts7.png',
    shell: 'https://pbs.twimg.com/profile_images/580803697304702976/h-QZArRy_400x400.png',
    lukoil: 'https://pbs.twimg.com/profile_images/3717020741/bd978ab46fc1a1b9bb73c62520e6e4f0.jpeg',
    agip: 'https://cdn.iconverticons.com/files/png/0f8a75a97a799f2d_256x256.png',
    avia: 'https://cdn6.aptoide.com/imgs/0/8/3/083e85e69a5dc249af0f5aa330f9ec05_icon.png?w=256'
  };
  lastKey: string = "";
  sorts: any = {}; //?
  order: number = 1;
  currentData: any; //?


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

  sort(key): void {

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
    this.sorts[key] = this.order == -1 ? 'up' : 'down';
    this.lastKey = key;
    this.tableData.sort((a, b) => {
      return a.data[key].toString().localeCompare(b.data[key].toString()) * this.order;
    });
  }

  //Update - adatok módosítása a pStation adatbázisban
  dataUpdate(row): void {
    this.db.object('uzemanyag/pstations/' + row.key).update(row.data);
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


}
