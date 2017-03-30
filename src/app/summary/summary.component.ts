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
  subscriptionDay:Subscription;
  subscriptionProfile:Subscription;

  displaySummary:boolean = false;

  caloriesPercentage:number = 0;
  proteinsPercentage:number = 0;
  caloriesBase:number = 0;

  constructor(private dataService:DataService) {
    this.subscription = this.dataService.mealChanged$.subscribe(
      (meal:Meal) => {
        this.compute();
      });
    this.subscriptionCalories = this.dataService.caloriesBaseChanged$.subscribe(
      (calories:number) => {
        this.caloriesBase = calories;
        this.compute();
      });
    this.subscriptionDay = this.dataService.dayChanged$.subscribe(
      (day:Day)=> {
        this.compute()
      });
    this.subscriptionProfile = this.dataService.profileChanged$.subscribe(
      (profile:Profile)=> {
        this.compute()
      });
  }

  ngOnInit() {
    this.compute();
  }

  compute():void {
    console.log("compute summary");

    this.displaySummary = false;

    var proteins:number = 0;
    var carbohydrates:number = 0;
    var fats:number = 0;
    var days = this.dataService.getDays();
    for (let day:Day of days) {
      for (let meal:Meal of day.meals) {
        for (let food:MealFood of meal.mealFoods) {
          proteins += food.weight * food.food.proteins / 100;
          carbohydrates += food.weight * food.food.carbohydrates / 100;
          fats += food.weight * food.food.fats / 100;

          this.displaySummary = true;
        }
      }
    }

    this.doughnutChartData = [proteins, carbohydrates, fats];

    this.computeDay();
  }

  computeDay():void {
    console.debug("compute day")
    var calories:number = 0;
    var proteins:number = 0;
    var carbohydrates:number = 0;
    var fats:number = 0;
    var day:Day = this.dataService.getSelectedDay();
    for (let meal:Meal of day.meals) {
      for (let food:MealFood of meal.mealFoods) {
        proteins += food.weight * food.food.proteins / 100;
        carbohydrates += food.weight * food.food.carbohydrates / 100;
        fats += food.weight * food.food.fats / 100;
        calories += food.weight * food.food.calories / 100;
      }
    }
    this.caloriesPercentage = (calories * 100) / this.caloriesBase;
    console.debug("caloriesPercentage : " + this.caloriesPercentage + " (calories : " + calories + ", base: " + this.caloriesBase + ")");

    if (this.dataService.getProfile() != undefined) {
      var weight = this.dataService.getProfile().weight;
      var proteinsPerKg = 2;
      if (weight > 0) {
        var proteinsPerDay = this.dataService.getProfile().weight * proteinsPerKg;
        this.proteinsPercentage = (proteins * 100) / proteinsPerDay;
        console.debug("proteinsPercentage : " + this.proteinsPercentage + " (proteins : " + proteins + ", proteins per day: " + proteinsPerDay + ")");
      }
    }
  }

  // Doughnut
  public doughnutChartLabels:string[] = ['Proteins', 'Carbohydrates', 'Fats'];
  public doughnutChartData:number[] = [0, 0, 0];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
  }

  public chartHovered(e:any):void {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
    this.subscriptionCalories.unsubscribe();
    this.subscriptionDay.unsubscribe();
    this.subscriptionProfile.unsubscribe();
  }

}
