import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {FoodComponent} from "./food.component";
import {MealComponent} from "./meal.component";
import {FoodSearchComponent} from "./food-search.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [AppComponent, FoodComponent, MealComponent, FoodSearchComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
