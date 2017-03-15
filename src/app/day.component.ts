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

  ngAfterViewInit() {
    console.debug("ngAfterViewInit");
    setTimeout(()=> {
      this.dataService.setSelectedDay(this.day);
      this.dataService.setSelectedMeal(this.day.meals[0]);
    }, 1);
  }

  addMeal(): void {
    this.dataService.newMeal(this.day);
  }
}
