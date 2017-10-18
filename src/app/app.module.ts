import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { NavbarComponent } from './navbar/navbar.component';
import { InstanceModule } from './instance/instance.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    InstanceModule,
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
