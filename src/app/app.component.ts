import {Component} from "@angular/core";
import {MealFood} from "./mealFood";

export class Profile {
  size: number;
  weight: number;
  age: number;
}

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
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

  ngOnInit(): void {
    let profile = JSON.parse(localStorage.getItem('profile'));
    if (profile !== undefined){
      this.profile = profile;
    }
  }

  computeCalories(): void {
    if (this.profile.age != undefined && this.profile.size != undefined && this.profile.weight != undefined) {
      var factor1: number, factor2: number, factor3: number;
      if (this.profile.age <= 18) {
        factor1 = 15.6;
        factor2 = 266;
        factor3 = 299;
      }
      else if (this.profile.age <= 30) {
        factor1 = 14.4;
        factor2 = 313;
        factor3 = 113;
      }
      else if (this.profile.age <= 60) {
        factor1 = 11.4;
        factor2 = 541;
        factor3 = 137;
      }
      else if (this.profile.age > 60) {
        factor1 = 11.4;
        factor2 = 541;
        factor3 = 256;
      }
      this.calories = Math.ceil(factor1 * this.profile.weight + factor2 * this.profile.size / 100 + factor3);
    }
  }

  onSubmit(): void {
    localStorage.setItem('profile', JSON.stringify(profile));
    this.computeCalories();
    if (this.calories > 0) {
      this.toggleCompute();
    }
  }

  onFoodSelected(food: MealFood) {
    console.debug("food selected : " + food);
    this.mealFoods.push(food);
    // create a new array (copy of the first one) to trigger ngOnChanges on meal component.
    this.mealFoods = this.mealFoods.slice(0)
  }

  toggleCompute(): void {
    this.compute = !this.compute;
  }

}
