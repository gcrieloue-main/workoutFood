import {Component, Input, OnDestroy} from "@angular/core";
import {MealFood} from "./mealFood";
import {MealService} from "./meal.service";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'meal',
  templateUrl: 'app/meal.component.html'
})
export class MealComponent implements OnDestroy {

  foods: MealFood[];

  @Input()
  caloriesBase: number;

  caloriesTotal = 0;
  caloriesPercentage = 0;

  subscription: Subscription;

  constructor(private mealService: MealService) {
    this.subscription = mealService.mealFoodChanged$.subscribe(
      mealFood => {
        this.foods = mealFood;
        this.computeCalories();
      });
  }

  computeCalories() {
    console.debug("compute meal calories");
    console.debug("calories base : ", this.caloriesBase);
    if (this.foods.length > 0) {
      this.caloriesTotal = Math.ceil(this.foods.map((mealFood)=>mealFood.weight * mealFood.food.calories / 100).reduce((c1, c2)=>c1 + c2));
      this.caloriesPercentage = Math.ceil((this.caloriesTotal * 100) / this.caloriesBase);
    }
    else {
      this.caloriesTotal = 0;
      this.caloriesPercentage = 0;
    }
    console.debug("=> total : %s, percentage : %s" + this.caloriesTotal, this.caloriesPercentage + "%");
  }

  remove(mealFood: MealFood) {
    this.mealService.removeMealFood(mealFood);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
