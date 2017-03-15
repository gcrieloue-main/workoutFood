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
  private mealSelectedSource = new Subject<Meal>();
  private days: Day[] = [];

  private selectedDay: Day;
  private selectedMeal: Meal;

  // observable
  caloriesBaseChanged$ = this.caloriesBaseSource.asObservable();
  dayChanged$ = this.daySource.asObservable();
  mealChanged$ = this.mealSource.asObservable();
  mealSelected$ = this.mealSelectedSource.asObservable();

  load() {
    console.info("load menu from local storage");
    let days: Day[] = JSON.parse(localStorage.getItem('menu'));
    if (days != null) {
      this.days = days;
    }
  }

  addMealFood(mealFood: MealFood) {
    console.info("add meal food ", JSON.stringify(mealFood));
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
    console.info("remove meal food ", JSON.stringify(mealFood));
    meal.mealFoods.splice(meal.mealFoods.indexOf(mealFood), 1);
    this.mealSource.next(meal);
    localStorage.setItem('menu', JSON.stringify(this.days));
  }

  setCaloriesBase(calories: number) {
    console.info("set calories base to ", calories)
    localStorage.setItem('calories', JSON.stringify(calories));
    this.caloriesBaseSource.next(calories);
  }

  getProfile(): Profile {
    let profile = JSON.parse(localStorage.getItem('profile'));
    if (profile != null) {
      console.info("retrieve profile : ", JSON.stringify(profile));
      return profile;
    }
    return null;
  }

  getCaloriesBase(): number {
    let calories = Number(localStorage.getItem('calories'));
    if (calories != null) {
      console.info("retrieve calories : ", calories);
      return calories;
    }
    return null;
  }

  setSelectedMeal(meal: Meal): void {
    console.info("select meal");
    this.selectedMeal = meal;
    this.mealSelectedSource.next(meal);
  }

  setSelectedDay(day: Day) {
    console.info("select day");
    this.selectedDay = day;
  }
}
