import {Component} from "@angular/core";
import {MealFood} from "./mealFood";

export class Profile {
  size: number;
  weight: number;
  age: number;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  profile: Profile = {
    size: undefined,
    weight: undefined,
    age: undefined
  };
  calories = 0;
  compute = false;

  mealFoods: MealFood[] = []

  computeCalories(): void {
    if (this.profile.age != undefined && this.profile.size != undefined && this.profile.weight != undefined) {
      if (this.profile.age <= 30) {
        this.calories = Math.ceil(14.4 * this.profile.weight + 313 * this.profile.size / 100 + 113);
      }
    }
  }

  onSubmit(): void {
    this.computeCalories();
    if (this.calories > 0) {
      this.toggleCompute();
    }
  }

  onFoodSelected(food: MealFood) {
    this.mealFoods.push(food);
    // create a new array (copy of the first one) to trigger ngOnChanges on meal component.
    this.mealFoods = this.mealFoods.slice(0)
  }

  toggleCompute(): void {
    this.compute = !this.compute;
  }

}
