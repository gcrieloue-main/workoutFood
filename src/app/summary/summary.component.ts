import {Component, Input, OnDestroy, ViewChildren} from "@angular/core";
import {DataService} from "../shared/data.service";
import {Meal} from '../meal/meal';

@Component({
  moduleId: module.id,
  selector: 'summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent {

  constructor(private dataService:DataService) {
    this.subscription = this.dataService.mealChanged$.subscribe(
      (meal:Meal) => {

      });
    this.subscriptionCalories = this.dataService.caloriesBaseChanged$.subscribe(
      (calories:number) => {

      });
  }

}
