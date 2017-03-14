import {Component, Input, OnDestroy} from "@angular/core";
import {MealFood} from "./mealFood";
import {DataService} from "./data.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'day',
  templateUrl: 'app/day.component.html'
})
export class DayComponent implements OnDestroy {
  meal:Meal = new Meal([]);
  day:Day = new Day([meal]);
}
