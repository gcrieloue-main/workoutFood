import {Component, Input, OnDestroy, ViewChildren} from "@angular/core";
import {Meal} from "./meal";
import {Day} from "./day";
import {MealComponent} from "./meal.component";

@Component({
  selector: 'day',
  templateUrl: 'app/day.component.html'
})
export class DayComponent implements OnDestroy {
  meal:Meal = {mealFoods: []}
  day:Day = {meals: [this.meal]};

  @ViewChildren('meal') meals:QueryList<MealComponent>;

  addMeal():void {
    this.day.meals.push({meals: {mealFoods: {}}});
  }
}
