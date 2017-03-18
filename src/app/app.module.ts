import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CoreComponent} from "./core.component";
import {CaloriesComponent} from "./calories/calories.component";
import {FoodComponent} from "./food/food.component";
import {MealComponent} from "./meal/meal.component";
import {FoodSearchComponent} from "./food-search/food-search.component";
import {Typeahead} from "./ng2-typeahead/ng2-typeahead";
import {DayComponent} from "./day/day.component";
import { RouterModule }   from '@angular/router';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'foods',
        component: FoodComponent
      }
    ])
  ],
  declarations: [CoreComponent, CaloriesComponent, FoodComponent, DayComponent, MealComponent, FoodSearchComponent, Typeahead],
  bootstrap: [CoreComponent]
})
export class AppModule {
}
