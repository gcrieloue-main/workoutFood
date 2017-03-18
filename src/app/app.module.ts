import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CoreComponent} from "./core/core.component";
import {CaloriesComponent} from "./calories/calories.component";
import {FoodComponent} from "./food/food.component";
import {MealComponent} from "./meal/meal.component";
import {FoodSearchComponent} from "./food-search/food-search.component";
import {Typeahead} from "./ng2-typeahead/ng2-typeahead";
import {DayComponent} from "./day/day.component";
import {FoodListComponent} from './food-list/food-list.component'
import { RouterModule }   from '@angular/router';
import {AppComponent} from "./app.component";



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/core',
        pathMatch: 'full'
      },
      {
        path: 'core',
        component: CoreComponent
      },
      {
        path: 'foods',
        component: FoodListComponent
      }
    ])
  ],
  declarations: [CoreComponent, CaloriesComponent, FoodComponent, DayComponent, MealComponent, FoodSearchComponent, Typeahead, FoodListComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
