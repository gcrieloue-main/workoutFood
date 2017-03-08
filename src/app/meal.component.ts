import {Component, Input} from "@angular/core";
import {MealFood} from "./mealFood";


@Component({
  selector: 'meal',
  templateUrl: './meal.component.html'
})
export class MealComponent {

  @Input()
  foods:MealFood[];

  caloriesTotal = 0;

  ngOnChanges(changes) {
    this.computeCalories()
  }

  computeCalories(){
    if (this.foods.length > 0) {
      this.caloriesTotal = Math.ceil(this.foods.map((mealFood)=>mealFood.weight * mealFood.food.calories / 100).reduce((c1, c2)=>c1 + c2));
    }
    else {
      this.caloriesTotal = 0;
    }
  }

  remove(mealFood:MealFood) {
    this.foods.splice(this.foods.indexOf(mealFood), 1);
    this.computeCalories();
  }

}
