import {Component, Input, OnDestroy, ViewChildren} from "@angular/core";
import {Meal} from "./meal";
import {Day} from "./day";
import {MealComponent} from "./meal.component";
import {DataService} from './data.service';

@Component({
  selector: 'day',
  templateUrl: 'app/day.component.html'
})
export class DayComponent implements OnDestroy {
  meal:Meal;
  day:Day;

  constructor(private dataService:DataService) {
    this.day = dataService.newDay();
  }

  @ViewChildren('meal') meals:QueryList<MealComponent>;

  addMeal():void {
    this.dataService.addMeal(this.day, {mealFoods: {}})
  }
}
