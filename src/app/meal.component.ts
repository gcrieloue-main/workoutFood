import {Component, Input, OnDestroy} from "@angular/core";
import {MealFood} from "./mealFood";
import {DataService} from "./data.service";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'meal',
  templateUrl: 'app/meal.component.html'
})
export class MealComponent implements OnDestroy {

  @Input()
  num:number;

  foods:MealFood[] = [];

  caloriesBase:number = 0;
  caloriesTotal:number = 0;
  caloriesPercentage:number = 0;

  subscription:Subscription;
  subscriptionCalories:Subscription;

  constructor(private dataService:DataService) {
    this.subscription = dataService.mealFoodChanged$.subscribe(
      mealFood => {
        console.debug(this.num, " reload foods");
        this.foods = mealFood;
        this.computeCalories();
      });
    this.subscriptionCalories = dataService.caloriesBaseChanged$.subscribe(
      calories => {
        console.debug(this.num, " reload calories base");
        this.caloriesBase = calories;
        this.computeCalories();
      });
    this.Math = Math;
  }

  computeCalories() {
    console.debug("compute meal calories");
    console.debug("calories base : ", this.caloriesBase);
    if (this.foods.length > 0) {
      this.caloriesTotal = Math.ceil(this.foods.map((mealFood)=>mealFood.weight * mealFood.food.calories / 100).reduce((c1, c2)=>c1 + c2));
      this.caloriesPercentage = Math.ceil((this.caloriesTotal * 100) / this.caloriesBase);
      if (this.caloriesPercentage > 100) {
        this.caloriesPercentage = 100;
      }
    }
    else {
      this.caloriesTotal = 0;
      this.caloriesPercentage = 0;
    }
    console.debug("=> total : ", this.caloriesTotal, ", percentage : ", this.caloriesPercentage);
  }

  remove(mealFood:MealFood) {
    this.dataService.removeMealFood(mealFood);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
    this.subscriptionCalories.unsubscribe();
  }
}
