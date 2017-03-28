import {Component, Input, OnDestroy, ViewChildren} from "@angular/core";
import {Day} from "../shared/day";
import {DataService} from "../shared/data.service";

@Component({
  moduleId: module.id,
  selector: 'day',
  templateUrl: './day.component.html'
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
