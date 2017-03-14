import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {CaloriesComponent} from "./calories.component";
import {FoodComponent} from "./food.component";
import {MealComponent} from "./meal.component";
import {FoodSearchComponent} from "./food-search.component";
import {Typeahead} from "./ng2-typeahead";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [AppComponent, CaloriesComponent, FoodComponent, MealComponent, FoodSearchComponent, Typeahead],
  bootstrap: [AppComponent]
})
export class AppModule {
}
