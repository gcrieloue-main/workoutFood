import {Component, Input, OnDestroy} from "@angular/core";
import {Meal} from "./meal";
import {Day} from "./day";

@Component({
  selector: 'day',
  templateUrl: 'app/day.component.html'
})
export class DayComponent implements OnDestroy {
  meal:Meal = {mealFoods: []}
  day:Day = {meals: [this.meal]};
}
