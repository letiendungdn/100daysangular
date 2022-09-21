import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <p>child-home works!</p>
    <router-outlet></router-outlet>
  `,
})
export class ChildHomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
