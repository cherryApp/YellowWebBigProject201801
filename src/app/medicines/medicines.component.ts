import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {
  albums: AngularFireList<any[]>;
  constructor() { }

  ngOnInit() {
  }
}