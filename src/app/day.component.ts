import {Component, Input, OnDestroy, ViewChildren} from "@angular/core";
import {Day} from "./day";
import {DataService} from './data.service';

@Component({
  selector: 'day',
  templateUrl: 'app/day.component.html'
})
export class DayComponent implements OnDestroy {
  day:Day;

  constructor(private dataService:DataService) {
    this.day = dataService.newDay();
    this.dataService.newMeal(this.day);
  }

  addMeal():void {
    this.dataService.newMeal(this.day);
  }
}
