import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { MatSelectModule } from '@angular/material/select'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componentes/login/login.component';
import { MasterComponent } from './Componentes/master/master.component';
import { DetailsComponent } from './Componentes/details/details.component';
import { AdminComponent } from './Componentes/admin/admin.component';
import { EmailValidatorDirective } from './directivas/email-validator.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MasterComponent,
    DetailsComponent,
    AdminComponent,
    EmailValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
