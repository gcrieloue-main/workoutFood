import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChartsModule} from "ng2-charts/ng2-charts";
import {CoreComponent} from "./core/core.component";
import {CaloriesComponent} from "./calories/calories.component";
import {FoodComponent} from "./food/food.component";
import {MealComponent} from "./meal/meal.component";
import {FoodSearchComponent} from "./food-search/food-search.component";
import {Typeahead} from "./ng2-typeahead/ng2-typeahead";
import {DayComponent} from "./day/day.component";
import {FoodListComponent} from "./food-list/food-list.component";
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {SummaryComponent} from "./summary/summary.component";
import {NotFoundComponent} from "./notfound/notfound.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ChartsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
      },
      {
        path: '**',
        component: NotFoundComponent,
        pathMatch: 'full'
      }
    ])
  ],
  declarations: [
    AppComponent,
    CoreComponent,
    CaloriesComponent,
    FoodComponent,
    DayComponent,
    MealComponent,
    FoodSearchComponent,
    Typeahead,
    FoodListComponent,
    SummaryComponent,
    NotFoundComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
