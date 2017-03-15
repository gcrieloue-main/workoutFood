import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {MealFood} from "./mealFood";

@Injectable()
export class DataService {
  private mealFoods:MealFood[] = [];
  private mealFoodSource = new Subject<MealFood[]>();
  private caloriesBaseSource = new Subject<nunber>();
  private daySource = new Subject<Day>();
  private days:Day[] = [];

  private selectedDay:Day;
  private selectedMeal:Meal;

  // observable
  mealFoodChanged$ = this.mealFoodSource.asObservable();
  caloriesBaseChanged$ = this.caloriesBaseSource.asObservable();
  dayChanged$ = this.daySource.asObservable();

  load() {
    console.debug("load meals from local storage");
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

  newDay(day:Day) {
    var day:Day = {meals: [this.meal]};
    this.days.push(day);
    return day;
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
