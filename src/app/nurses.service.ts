import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';


@Injectable()
export class NursesService {
  nursesCollection: AngularFirestoreCollection<Nurse>;

  nurses: Observable<any>;

  constructor(public afs: AngularFirestore) {
    this.nurses = this.afs.collection('nurses').valueChanges();

  }

  getNurses() {
    return this.nurses;
  }

}

interface Nurse {
  id?: string;
  name?: string;
  pensioners?: string;
}