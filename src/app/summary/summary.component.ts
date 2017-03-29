import {Component, Input, OnDestroy, ViewChildren} from "@angular/core";
import {DataService} from "../shared/data.service";
import {Meal} from "../meal/meal";
import {Subscription} from "rxjs/Subscription";
import {Day} from "../shared/day";
import {MealFood} from "../shared/mealFood";

@Component({
  moduleId: module.id,
  selector: 'summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent {
  subscription:Subscription;
  subscriptionCalories:Subscription;

  constructor(private dataService:DataService) {
    this.subscription = this.dataService.mealChanged$.subscribe(
      (meal:Meal) => {
        this.compute();
      });
    this.subscriptionCalories = this.dataService.caloriesBaseChanged$.subscribe(
      (calories:number) => {
        this.compute();
      });
  }

  ngOnInit() {
    this.compute();
  }

  compute():void {
    console.log("compute summary");

    var proteins:number = 0;
    var glucids:number = 0;
    var carbohydrates:number = 0;
    var fats:number = 0;
    var days = this.dataService.getDays();
    for (let day:Day of days) {
      for (let meal:Meal of day.meals) {
        for (let food:MealFood of meal.mealFoods) {
          proteins += food.weight * food.food.proteins;
          carbohydrates += food.weight * food.food.carbohydrates;
          fats += food.weight * food.food.fats;
        }
      }
    }

    this.doughnutChartData = [proteins, glucids, carbohydrates, fats];
  }

  // Doughnut
  public doughnutChartLabels:string[] = ['Proteins', 'Carbohydrates', 'Fats'];
  public doughnutChartData:number[] = [0, 0, 0];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
