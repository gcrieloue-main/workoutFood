import {Component, Input} from "@angular/core";
import {MealFood} from "./mealFood";


@Component({
  selector: 'meal',
  templateUrl: 'app/meal.component.html'
})
export class MealComponent {

  @Input()
  foods:MealFood[];

  @Input()
  caloriesBase:number;

  caloriesTotal = 0;
  caloriesPercentage = 0;

  ngOnChanges() {
    this.computeCalories()
  }

  computeCalories(){
    console.debug("compute calories");
    if (this.foods.length > 0) {
      this.caloriesTotal = Math.ceil(this.foods.map((mealFood)=>mealFood.weight * mealFood.food.calories / 100).reduce((c1, c2)=>c1 + c2));
      this.caloriesPercentage = Math.ceil((this.caloriesTotal * 100) / this.caloriesBase);
    }
    else {
      this.caloriesTotal = 0;
      this.caloriesPercentage = 0;
    }
  }

  remove(mealFood:MealFood) {
    console.debug("food removed : " + mealFood);
    this.foods.splice(this.foods.indexOf(mealFood), 1);
    this.computeCalories();
  }

}
