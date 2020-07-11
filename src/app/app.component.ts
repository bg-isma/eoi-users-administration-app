import { Component,  OnInit, EventEmitter } from '@angular/core';
import { Alumn } from 'src/app/Interfaces/alumn';
import { Session } from 'src/app/Interfaces/session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sessionAdmin : Session; 
  sessionAlumn : Alumn; 
  title = 'eoi-users-administration-app';

  user = { id: '', img: "https://image.flaticon.com/icons/svg/2742/2742473.svg" }
  isLogin = true;

  constructor () {
  }

  ngOnInit(): void {
    if ( window.location.pathname === '/login' ) { this.isLogin = false; }
    this.user = JSON.parse(window.localStorage.getItem('currentSession')) || { id: '', img: "https://image.flaticon.com/icons/svg/2742/2742473.svg" }
  }

  login(){
    let session = JSON.parse(window.localStorage.getItem('currentSession'));
    if(session && Object.keys(session).includes('email') ){
      this.sessionAdmin = session;
      console.log(this.sessionAdmin);
    } else if (session && Object.keys(session).includes('loginEmail')){
      this.sessionAlumn = session;
      console.log(this.sessionAlumn);
    }
  }
}
