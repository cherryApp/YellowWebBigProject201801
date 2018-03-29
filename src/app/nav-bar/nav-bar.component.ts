import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  menuList: Array<{ label: string, url: string }> = [
    { label: 'Admin', url: '/login' },
    { label: 'Customers', url: '/products' },
    { label: 'Products', url: '/products' },
    { label: 'Orders', url: '/products' }
  ]
  constructor() { }

  ngOnInit() {
  }

}
