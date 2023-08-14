import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HttpClientModule } from '@angular/common/http';
import { AdminModuleComponent } from './Components/admin-module/admin-module.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminModuleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    
    
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
