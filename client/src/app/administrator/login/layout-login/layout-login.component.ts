import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-login',
  template: `
  <div class="wrapper">
      <div class="main-panel-login">
      <router-outlet></router-outlet>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class LayoutLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
