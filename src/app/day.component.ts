import {Component, Input, OnDestroy, ViewChildren} from "@angular/core";
import {Day} from "./day";
import {DataService} from "./data.service";

@Component({
  selector: 'day',
  templateUrl: 'app/day.component.html'
})
export class DayComponent {
  @Input()
  day: Day;

  constructor(private dataService: DataService) {
  }

  addMeal(): void {
    this.dataService.newMeal(this.day);
  }
}
