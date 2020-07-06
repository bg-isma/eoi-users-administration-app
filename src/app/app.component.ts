import { Component,  OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eoi-users-administration-app';

  user = { id: '', img: "https://image.flaticon.com/icons/svg/2742/2742473.svg" }

  constructor () {
  }

  ngOnInit(): void {
    this.user = JSON.parse(window.localStorage.getItem('currentSession')) || { id: '', img: "https://image.flaticon.com/icons/svg/2742/2742473.svg" }
  }

}
