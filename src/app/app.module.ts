import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componentes/login/login.component';
import { MasterComponent } from './Componentes/master/master.component';
import { DetailsComponent } from './Componentes/details/details.component';
import { AdminComponent } from './Componentes/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MasterComponent,
    DetailsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
