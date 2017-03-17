import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {CaloriesComponent} from "./calories/calories.component";
import {FoodComponent} from "./food/food.component";
import {MealComponent} from "./meal/meal.component";
import {FoodSearchComponent} from "./food-search/food-search.component";
import {Typeahead} from "./ng2-typeahead/ng2-typeahead";
import {DayComponent} from "./day/day.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [AppComponent, CaloriesComponent, FoodComponent, DayComponent, MealComponent, FoodSearchComponent, Typeahead],
  bootstrap: [AppComponent]
})
export class AppModule {
}
