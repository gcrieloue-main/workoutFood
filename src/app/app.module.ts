import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';


import { AppComponent }  from './app.component';
import {FoodComponent} from "./food.component";
import {MealComponent} from "./meal.component";

@NgModule({
imports: [
    BrowserModule,
    FormsModule
    ],
  declarations: [ AppComponent, FoodComponent, MealComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
