import {Injectable} from "@angular/core";
import {Subject} from 'rxjs/Subject';
import {MealFood} from "./mealFood";

@Injectable()
export class MealService {
  private mealFoods: MealFood[];
  private mealFoodSource = new Subject<MealFood[]>();

  // observable
  mealFoodChanged$ = this.mealFoodSource.asObservable();

  addMealFood(mealFood:MealFood)
  {
    this.mealFoods.push(mealFood);
    this.mealFoodSource.next(this.mealFoods);
  }

  removeMealFood(mealFood:MealFood)
  {
    this.mealFoods.splice(this.mealFoods.indexOf(mealFood), 1);
    this.mealFoodSource.next(this.mealFoods);
  }
}
