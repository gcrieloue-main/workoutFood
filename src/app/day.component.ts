import {Component, Input, OnDestroy, ViewChildren} from "@angular/core";
import {Day} from "./day";
import {DataService} from "./data.service";

@Component({
  selector: 'day',
  templateUrl: 'app/day.component.html'
})
export class DayComponent {
  day: Day;

  constructor(private dataService: DataService) {
    this.day = this.dataService.newDay();
    var meal = this.dataService.newMeal(this.day);
    this.dataService.setSelectedDay(this.day);
    this.dataService.setSelectedMeal(meal);
  }

  addMeal(): void {
    this.dataService.newMeal(this.day);
  }
}
