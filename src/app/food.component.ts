import {Component, Output, EventEmitter} from "@angular/core";
import {Food} from "./food";
import {FoodService} from "./food.service";
import {MealFood} from "./mealFood";

@Component({
  selector: 'food-selector',
  templateUrl: 'app/food.component.html',
  providers: [FoodService]
})
export class FoodComponent {

  selectedFood:Food;
  foods:Food[];
  weight:number;

  constructor(private foodService:FoodService) {

  }

  ngOnInit():void {
    this.foods = this.foodService.getFoods();
  }

  @Output() onFoodSelected = new EventEmitter<MealFood>();

  onSearchFoodSelected(food:Food) {
    console.debug("search food selected : " + food);
    this.selectedFood = food;
  }

  onSubmit():void {
    if (this.selectedFood !== undefined) {
      console.debug("food selected " + this.selectedFood.name);
      this.onFoodSelected.emit(new MealFood(this.selectedFood, (this.weight !== undefined && this.weight > 0 ? this.weight : 100)));
    }
  }
}
