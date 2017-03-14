import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {MealFood} from "./mealFood";

@Injectable()
export class DataService {
  private mealFoods:MealFood[] = [];
  private mealFoodSource = new Subject<MealFood[]>();
  private caloriesBaseSource = new Subject<nunber>();

  // observable
  mealFoodChanged$ = this.mealFoodSource.asObservable();
  caloriesBaseChanged$ = this.caloriesBaseSource.asObservable();

  load() {
    let mealFoods = JSON.parse(localStorage.getItem('mealFoods'));
    if (mealFoods != null) {
      this.mealFoods = mealFoods;
      this.mealFoodSource.next(this.mealFoods);
    }
  }

  addMealFood(mealFood:MealFood) {
    console.debug("add meal food ", JSON.stringify(mealFood));
    this.mealFoods.push(mealFood);
    this.mealFoodSource.next(this.mealFoods);
    localStorage.setItem('mealFoods', JSON.stringify(this.mealFoods));
  }

  removeMealFood(mealFood:MealFood) {
    console.debug("remove meal food ", JSON.stringify(mealFood));
    this.mealFoods.splice(this.mealFoods.indexOf(mealFood), 1);
    this.mealFoodSource.next(this.mealFoods);
    localStorage.setItem('mealFoods', JSON.stringify(this.mealFoods));
  }

  setCaloriesBase(calories:number) {
    console.debug("set calories base to ", calories)
    localStorage.setItem('calories', JSON.stringify(calories));
    this.caloriesBaseSource.next(calories);
  }

  getProfile() {
    let profile = JSON.parse(localStorage.getItem('profile'));
    if (profile != null) {
      console.debug("retrieve profile : ", JSON.stringify(profile));
      return profile;
    }
    return null;
  }

  getCaloriesBase() {
    let calories = Number(localStorage.getItem('calories'));
    if (calories != null) {
      console.debug("retrieve calories : ", calories);
      return calories;
    }
    return null;
  }
}
