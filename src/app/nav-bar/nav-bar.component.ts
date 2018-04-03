import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  menuList: Array<{ label: string, url: string }> = [
    { label: 'Admin', url: '/login' },
    { label: 'Customers', url: '/customers' },
    { label: 'Products', url: '/products' },
    { label: 'Orders', url: '/orders' }
  ]
  constructor() { }

  ngOnInit() {
  }
  runForestRun() {
    document.getElementById('copcar').style.display = "block";
    document.getElementById('copcar').style.animationName = "run2";
    document.getElementById('mario').style.display = "block";
    document.getElementById('mario').style.animationName = "run";
    setInterval(function (
    ) {
      document.getElementById('copcar').style.animationName = "none";
      document.getElementById('copcar').style.display = "none";
      document.getElementById('mario').style.animationName = "none";
      document.getElementById('mario').style.display = "none";
    }, 6000)
  }
}


