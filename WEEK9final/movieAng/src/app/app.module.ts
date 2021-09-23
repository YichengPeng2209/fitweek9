import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ActorComponent } from './actor/actor.component';
import { MovieComponent } from './movie/movie.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { DatabaseService } from "./database.service";


@NgModule({
  declarations: [
    AppComponent,
    ActorComponent,
    MovieComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
