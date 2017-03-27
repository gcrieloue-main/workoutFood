import {Component, Input, OnDestroy} from "@angular/core";
import {MealFood} from "../shared/mealFood";
import {DataService} from "../shared/data.service";
import {Subscription} from "rxjs/Subscription";
import {Meal} from "./meal";


@Component({
  selector: 'meal',
  templateUrl: './meal.component.html'
})
export class MealComponent implements OnDestroy {

  @Input()
  num: number;

  @Input()
  meal: Meal;

  isSelected: boolean;

  caloriesBase: number = 0;
  caloriesTotal: number = 0;
  caloriesPercentage: number = 0;

  subscription: Subscription;
  subscriptionCalories: Subscription;
  subscriptionMealSelect: Subscription;

  private Math: any;

  constructor(private dataService: DataService) {
    console.debug("constructor called");
    this.subscriptionMealSelect = this.dataService.mealSelected$.subscribe(
      (meal: Meal) => {
        this.isSelected = (meal == this.meal);
        console.debug((this.num === undefined ? 'X' : this.num) + ": test is selected - " + this.isSelected);
      });
    this.subscription = this.dataService.mealChanged$.subscribe(
      (meal: Meal) => {
        if (meal == this.meal) {
          this.computeCalories();
        }
      });
    this.subscriptionCalories = this.dataService.caloriesBaseChanged$.subscribe(
      (calories: number) => {
        console.debug("reload calories base : " + calories);
        this.caloriesBase = calories;
        this.computeCalories();
      });

    this.Math = Math;
  }

  ngAfterViewInit() {
    console.debug("ngAfterViewInit");
  }

  ngOnInit() {
    console.debug("ngOnInit");
    this.caloriesBase = this.dataService.loadCaloriesBase();
    this.computeCalories();
    this.isSelected = this.dataService.getSelectedMeal() == this.meal;
  }

  computeCalories() {
    console.info("compute meal calories");
    console.debug("calories base : ", this.caloriesBase);

    if (this.meal == undefined) {
      console.debug("can't compute calories : meal is undefined");
    }

    if (this.meal !== undefined && this.meal.mealFoods.length > 0) {
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

  removeMeal() {
    this.dataService.removeMeal(this.meal);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
    this.subscriptionCalories.unsubscribe();
    this.subscriptionMealSelect.unsubscribe();
  }

  onSelectMeal() {
    this.dataService.setSelectedMeal(this.meal);
  }
}
