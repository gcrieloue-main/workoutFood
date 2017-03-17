import {Component, Output, EventEmitter} from "@angular/core";
import {Food} from "../shared/food";
import {FoodService} from "./food.service";
import {MealFood} from "../shared/mealFood";

@Component({
  moduleId: module.id,
  selector: 'food-selector',
  templateUrl: './food.component.html',
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
    console.debug("search food selected : " + JSON.stringify(food));
    this.selectedFood = food;
  }

  onSubmit():void {
    if (this.selectedFood !== undefined) {
      console.debug("food selected " + this.selectedFood.name);
      this.onFoodSelected.emit(new MealFood(this.selectedFood, (this.weight !== undefined && this.weight > 0 ? this.weight : 100)));
    }
  }
}
