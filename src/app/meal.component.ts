import {Component, Input, OnDestroy} from "@angular/core";
import {MealFood} from "./mealFood";
import {DataService} from "./data.service";
import {Subscription} from "rxjs/Subscription";
import {Meal} from "./meal";


@Component({
  selector: 'meal',
  templateUrl: 'app/meal.component.html'
})
export class MealComponent implements OnDestroy {

  @Input()
  num: number;

  @Input()
  meal: Meal;

  caloriesBase: number = 0;
  caloriesTotal: number = 0;
  caloriesPercentage: number = 0;

  subscription: Subscription;
  subscriptionCalories: Subscription;

  private Math: any;

  constructor(private dataService: DataService) {
    console.info("constructor called");
    this.Math = Math;
  }

  ngAfterViewInit() {
    console.info("ngAfterViewInit");
    this.subscription = this.dataService.mealChanged$.subscribe(
      (meal: Meal) => {
        if (meal == this.meal){
          this.computeCalories();
        }
      });
    this.subscriptionCalories = this.dataService.caloriesBaseChanged$.subscribe(
      (calories: number) => {
        console.debug("reload calories base");
        this.caloriesBase = calories;
        this.computeCalories();
      });
  }

  ngOnInit() {
    console.debug(" ngOnInit");
  }

  computeCalories() {
    console.info("compute meal calories");
    console.debug("calories base : ", this.caloriesBase);
    if (this.meal.mealFoods.length > 0) {
      this.caloriesTotal = Math.ceil(this.meal.mealFoods.map((mealFood: MealFood)=>mealFood.weight * mealFood.food.calories / 100).reduce((c1: number, c2: number)=>c1 + c2));
      this.caloriesPercentage = Math.ceil((this.caloriesTotal * 100) / this.caloriesBase);
      if (this.caloriesPercentage > 100) {
        this.caloriesPercentage = 100;
      }
    }
    else {
      this.caloriesTotal = 0;
      this.caloriesPercentage = 0;
    }
    console.debug("=> total : ", this.caloriesTotal, ", percentage : ", this.caloriesPercentage);
  }

  remove(mealFood: MealFood) {
    this.dataService.removeMealFood(this.meal, mealFood);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
    this.subscriptionCalories.unsubscribe();
  }
}
