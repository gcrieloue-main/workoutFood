import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {MealFood} from "./mealFood";
import {Day} from "./day";
import {Meal} from "./meal";
import {Profile} from "./calories.component";

@Injectable()
export class DataService {
  private caloriesBaseSource = new Subject<number>();
  private daySource = new Subject<Day>();
  private mealSource = new Subject<Meal>();
  private days: Day[] = [];

  private selectedDay: Day;
  private selectedMeal: Meal;

  // observable
  caloriesBaseChanged$ = this.caloriesBaseSource.asObservable();
  dayChanged$ = this.daySource.asObservable();
  mealChanged$ = this.mealSource.asObservable();

  load() {
    console.debug("load menu from local storage");
    let days: Day[] = JSON.parse(localStorage.getItem('menu'));
    if (days != null) {
      this.days = days;
    }
  }

  addMealFood(mealFood: MealFood) {
    console.debug("add meal food ", JSON.stringify(mealFood));
    this.selectedMeal.mealFoods.push(mealFood);
    this.mealSource.next(this.selectedMeal);
    localStorage.setItem('menu', JSON.stringify(this.days));
  }

  newDay(): Day {
    var day: Day = {meals: []};
    this.days.push(day);
    return day;
  }

  newMeal(day: Day): Meal {
    var meal: Meal = {mealFoods: []};
    day.meals.push(meal);
    return meal;
  }

  removeMealFood(meal: Meal, mealFood: MealFood) {
    console.debug("remove meal food ", JSON.stringify(mealFood));
    meal.mealFoods.splice(meal.mealFoods.indexOf(mealFood), 1);
    this.mealSource.next(meal);
    localStorage.setItem('menu', JSON.stringify(this.days));
  }

  setCaloriesBase(calories: number) {
    console.debug("set calories base to ", calories)
    localStorage.setItem('calories', JSON.stringify(calories));
    this.caloriesBaseSource.next(calories);
  }

  getProfile(): Profile {
    let profile = JSON.parse(localStorage.getItem('profile'));
    if (profile != null) {
      console.debug("retrieve profile : ", JSON.stringify(profile));
      return profile;
    }
    return null;
  }

  getCaloriesBase(): number {
    let calories = Number(localStorage.getItem('calories'));
    if (calories != null) {
      console.debug("retrieve calories : ", calories);
      return calories;
    }
    return null;
  }

  setSelectedMeal(meal: Meal): void {
    this.selectedMeal = meal;
  }

  setSelectedDay(day: Day) {
    this.selectedDay = day;
  }
}
