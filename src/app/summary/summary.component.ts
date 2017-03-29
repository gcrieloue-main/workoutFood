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
    var lipids:number = 0;
    var fats:number = 0;
    var days = this.dataService.getDays();
    for (let day:Day in days) {
      for (let meal:Meal in day.meals) {
        for (let food:MealFood in meal.mealFoods) {
          console.log(JSON.stringify(food));

          proteins += food.weight * food.food.proteins;
          glucids += food.weight * food.food.proteins;
          lipids += food.weight * food.food.proteins;
          fats += food.weight * food.food.proteins;
        }
      }
    }

    console.log("proteins: " + proteins +
      ", glucids:" + glucids +
      ", lipids:" + lipids +
      ", fats:" + fats
    );
    this.doughnutChartData = [proteins, glucids, lipids, fats];
  }

  // Doughnut
  public doughnutChartLabels:string[] = ['Proteins', 'Glucids', 'Lipids', 'Fats'];
  public doughnutChartData:number[] = [350, 450, 100, 100];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
