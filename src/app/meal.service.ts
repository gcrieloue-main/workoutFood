import {Injectable} from "@angular/core";
import {Subject} from 'rxjs/Subject';
import {MealFood} from "./mealFood";

@Injectable()
export class MealService {
  private mealFoods: MealFood[] = {};
  private mealFoodSource = new Subject<MealFood[]>();

  // observable
  mealFoodChanged$ = this.mealFoodSource.asObservable();

  addMealFood(mealFood:MealFood)
  {
    console.debug("add meal food " + JSON.stringify(mealFood));
    this.mealFoods.push(mealFood);
    this.mealFoodSource.next(this.mealFoods);
  }

  removeMealFood(mealFood:MealFood)
  {
    console.debug("remove meal food " + JSON.stringify(mealFood));
    this.mealFoods.splice(this.mealFoods.indexOf(mealFood), 1);
    this.mealFoodSource.next(this.mealFoods);
  }
}
