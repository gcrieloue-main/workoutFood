import {Component} from "@angular/core";
import {MealFood} from "./mealFood";
import {MealService} from "./meal.service";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers: [MealService]
})
export class AppComponent {
  mealFoods:MealFood[] = []

  constructor(private mealService: MealService){

  }

  onFoodSelected(food:MealFood) {
    console.debug("food selected : " + JSON.stringify(food));
    this.mealFoods.push(food);
    // create a new array (copy of the first one) to trigger ngOnChanges on meal component.
    this.mealFoods = this.mealFoods.slice(0)

    //test service
    this.mealService.addMealFood(food);
  }
}
