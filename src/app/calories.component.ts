import {Component, Input} from "@angular/core";
import {MealService} from './meal.service';

export class Profile {
  size:number;
  weight:number;
  age:number;
}

@Component({
  selector: 'calories-selector',
  templateUrl: 'app/calories.component.html'
})
export class CaloriesComponent {
  profile:Profile = {
    size: undefined,
    weight: undefined,
    age: undefined
  };
  activityIntensity:number = 0;
  compute:boolean = false;
  calories:number = 0;

  constructor(private mealService:MealService) {

  }

  ngOnInit():void {
    let profile = JSON.parse(localStorage.getItem('profile'));
    if (profile != null) {
      console.debug("retrieve profile : " + JSON.stringify(profile));
      this.profile = profile;
    }

    let calories = Number(localStorage.getItem('calories'));
    if (calories != null) {
      console.debug("retrieve calories : " + calories);
      this.calories = calories;
    }
  }

  computeCalories():void {
    console.debug("compute calories")
    if (this.profile.age != undefined && this.profile.size != undefined && this.profile.weight != undefined) {
      var factor1:number, factor2:number, factor3:number;
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
      var metabolicRate = Math.ceil(factor1 * this.profile.weight + factor2 * this.profile.size / 100 + factor3);
      console.debug("metabolic rate : " + metabolicRate);
      console.debug("activity intensity : " + this.activityIntensity);
      this.calories = metabolicRate * this.activityIntensity;
      mealService.setCaloriesBase(this.calories);
      this.onCaloriesChange(this.calories);
    }
  }


  onSubmit():void {
    localStorage.setItem('profile', JSON.stringify(this.profile));
    this.computeCalories();
    if (this.calories > 0) {
      this.toggleCompute();
    }
  }

  onCaloriesChange(calories:number) {
    this.calories = calories;
    this.mealService.setCaloriesBase(this.calories);
  }

  toggleCompute():void {
    this.compute = !this.compute;
  }
}
