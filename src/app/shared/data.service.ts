import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {MealFood} from "./mealFood";
import {Day} from "./day";
import {Food} from "./food";
import {Meal} from "../meal/meal";
import {Profile} from "../calories/calories.component";

@Injectable()
export class DataService {
  private caloriesBaseSource = new Subject<number>();
  private daySource = new Subject<Day>();
  private mealSource = new Subject<Meal>();
  private mealSelectedSource = new Subject<Meal>();
  private profileSource = new Subject<Profile>();
  private days:Day[] = [];

  private selectedDay:Day;
  private selectedMeal:Meal;
  private profile:Profile;

  // observable
  caloriesBaseChanged$ = this.caloriesBaseSource.asObservable();
  dayChanged$ = this.daySource.asObservable();
  mealChanged$ = this.mealSource.asObservable();
  profileChanged$ = this.profileSource.asObservable();
  mealSelected$ = this.mealSelectedSource.asObservable();

  loadProfile():Profile {
    let profile = JSON.parse(localStorage.getItem('profile'));
    if (profile != null) {
      console.info("retrieve profile : ", JSON.stringify(profile));
      this.profile = profile;
      this.profileSource.next(this.profile);
      return profile;
    }
    return null;
  }

  setProfile(profile:Profile) {
    this.profile = profile;
    localStorage.setItem('profile', JSON.stringify(profile));
    this.profileSource.next(this.profile);
  }

  getProfile():Profile {
    return this.profile;
  }

  saveMenu() {
    localStorage.setItem('menu', JSON.stringify(this.days));
  }

  newMeal(day:Day):Meal {
    console.info("new meal");
    var meal:Meal = {mealFoods: []};
    day.meals.push(meal);
    this.saveMenu();
    if (day == this.selectedDay && this.selectedDay.meals.length == 1) {
      this.setSelectedMeal(meal);
    }
    return meal;
  }

  removeMeal(meal:Meal) {
    console.info("remove meal " + (this.selectedDay.meals.indexOf(meal) + 1) + " on day " + (this.days.indexOf(this.selectedDay) + 1));
    var changeSelectedMeal:boolean;

    if (this.selectedMeal == meal) {
      changeSelectedMeal = true;
    }

    this.selectedDay.meals.splice(this.selectedDay.meals.indexOf(meal), 1);

    if (changeSelectedMeal) {
      if (this.selectedDay.meals.length > 0) {
        this.setSelectedMeal(this.selectedDay.meals[0]);
      }
      else {
        this.setSelectedMeal(null);
      }
    }

    this.saveMenu();
  }

  addMealFood(mealFood:MealFood) {
    if (this.selectedMeal != null && this.selectedMeal !== undefined) {
      console.info("add meal food ", JSON.stringify(mealFood));
      this.selectedMeal.mealFoods.push(mealFood);
      this.mealSource.next(this.selectedMeal);
      this.saveMenu();
    }
  }

  removeMealFood(meal:Meal, mealFood:MealFood) {
    console.info("remove meal food ", JSON.stringify(mealFood));
    meal.mealFoods.splice(meal.mealFoods.indexOf(mealFood), 1);
    this.mealSource.next(meal);
    this.saveMenu();
  }

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

  getDays():Day[] {
    return this.days;
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

  removeDay(day:Day) {
    console.info("remove day " + (this.days.indexOf(day) + 1));
    this.days.splice(this.days.indexOf(day), 1);
    this.saveMenu();
  }

  setSelectedDay(day:Day) {
    console.info("select day");
    this.selectedDay = day;
    this.daySource.next(day);
  }

  getSelectedDay():Day {
    return this.selectedDay;
  }

  setCaloriesBase(calories:number) {
    console.info("set calories base to ", calories)
    localStorage.setItem('calories', JSON.stringify(calories));
    this.caloriesBaseSource.next(calories);
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
    console.info("select meal " + (this.selectedDay.meals.indexOf(meal) + 1) + " on day " + (this.days.indexOf(this.selectedDay) + 1));
    this.selectedMeal = meal;
    this.mealSelectedSource.next(meal);
  }

  getSelectedMeal():Meal {
    return this.selectedMeal;
  }

  getCustomFoods() {
    let customFoods = JSON.parse(localStorage.getItem('customFoods'));
    if (customFoods != null) {
      console.info("retrieve customFoods : ", JSON.stringify(customFoods));
      return customFoods;
    }
    return [];
  }

  setCustomFoods(customFoods:Food[]) {
    localStorage.setItem('customFoods', JSON.stringify(customFoods));
  }
}
