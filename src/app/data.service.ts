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
  private days:Day[] = [];

  private selectedDay:Day;
  private selectedMeal:Meal;

  // observable
  caloriesBaseChanged$ = this.caloriesBaseSource.asObservable();
  dayChanged$ = this.daySource.asObservable();
  mealChanged$ = this.mealSource.asObservable();
  mealSelected$ = this.mealSelectedSource.asObservable();

  loadDays():Day[] {
    console.info("load menu from local storage");
    let days:Day[] = JSON.parse(localStorage.getItem('menu'));
    if (days != null) {
      this.days = days;
      console.debug(this.days.length + " days loaded");
    }
    else {
      this.days = [this.newDay()]
    }
    return this.days;
  }

  addMealFood(mealFood:MealFood) {
    console.info("add meal food ", JSON.stringify(mealFood));
    this.selectedMeal.mealFoods.push(mealFood);
    this.mealSource.next(this.selectedMeal);
    this.saveMenu();
  }

  saveMenu() {
    localStorage.setItem('menu', JSON.stringify(this.days));
  }

  newDay():Day {
    console.info("new day");
    var meal:Meal = {mealFoods: []};
    var day:Day = {meals: [meal]};
    this.days.push(day);
    console.log(this.days.length + " days in total");
    this.saveMenu();
    return day;
  }

  newMeal(day:Day):Meal {
    console.info("new meal");
    var meal:Meal = {mealFoods: []};
    day.meals.push(meal);
    this.saveMenu();
    return meal;
  }

  removeMealFood(meal:Meal, mealFood:MealFood) {
    console.info("remove meal food ", JSON.stringify(mealFood));
    meal.mealFoods.splice(meal.mealFoods.indexOf(mealFood), 1);
    this.mealSource.next(meal);
    this.saveMenu();
  }

  setCaloriesBase(calories:number) {
    console.info("set calories base to ", calories)
    localStorage.setItem('calories', JSON.stringify(calories));
    this.caloriesBaseSource.next(calories);
  }

  loadProfile():Profile {
    let profile = JSON.parse(localStorage.getItem('profile'));
    if (profile != null) {
      console.info("retrieve profile : ", JSON.stringify(profile));
      return profile;
    }
    return null;
  }

  loadCaloriesBase():number {
    let calories = Number(localStorage.getItem('calories'));
    if (calories != null) {
      console.info("retrieve calories : ", calories);
      this.caloriesBaseSource.next(calories);
      return calories;
    }
    return null;
  }

  setSelectedMeal(meal:Meal):void {
    console.info("select meal " + this.selectedDay.meals.indexOf(meal) + 1 + " on day " + this.days.indexOf(this.selectedDay) + 1);
    this.selectedMeal = meal;
    this.mealSelectedSource.next(meal);
  }

  setSelectedDay(day:Day) {
    console.info("select day");
    this.selectedDay = day;
  }
}
