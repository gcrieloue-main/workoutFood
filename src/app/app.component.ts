import {Component} from "@angular/core";
import {MealFood} from "./mealFood";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  mealFoods:MealFood[] = []

  onFoodSelected(food:MealFood) {
    console.debug("food selected : " + JSON.stringify(food));
    this.mealFoods.push(food);
    // create a new array (copy of the first one) to trigger ngOnChanges on meal component.
    this.mealFoods = this.mealFoods.slice(0)
  }
}
