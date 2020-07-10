import { Component,  OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eoi-users-administration-app';

  user = { id: '', img: "https://image.flaticon.com/icons/svg/2742/2742473.svg" }
  isLogin = true;

  constructor () {
  }

  ngOnInit(): void {
    if ( window.location.pathname === '/login' ) {
      this.isLogin = false;
    }
    this.user = JSON.parse(window.localStorage.getItem('currentSession')) || { id: '', img: "https://image.flaticon.com/icons/svg/2742/2742473.svg" }
  }

}
