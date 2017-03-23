import {Component, Output, EventEmitter, ViewChild} from "@angular/core";
import {FoodService} from "../shared/food.service";
import {DataService} from "../shared/data.service";
import {Food} from "../shared/food";

@Component({
  moduleId: module.id,
  selector: 'food-list-selector',
  templateUrl: './food-list.component.html',
  providers: [FoodService, DataService]
})
export class FoodListComponent {

  foods: Food[];

  customFoods: Food[] = [];
  customFood: Food = new Food(undefined, undefined, undefined, undefined, undefined);

  @ViewChild('customFoodForm') customFoodForm: any;

  constructor(private foodService: FoodService, private dataService: DataService) {
    this.foods = foodService.getFoods();
    this.customFoods = dataService.getCustomFoods();
  }

  addCustomFood() {
    if (this.customFoodForm.valid) {
      if (!(this.customFood.calories > 0)) this.customFood.calories = 0;
      if (!(this.customFood.fats > 0)) this.customFood.fats = 0;
      if (!(this.customFood.carbohydrates > 0)) this.customFood.carbohydrates = 0;
      if (!(this.customFood.proteins > 0)) this.customFood.proteins = 0;
      this.customFoods.push(this.customFood);
      this.dataService.setCustomFoods(this.customFoods);
      this.customFood = new Food(undefined, undefined, undefined, undefined, undefined);
    }
  }

  removeFood(food: Food) {
    this.customFoods.splice(this.customFoods.indexOf(food), 1);
    this.dataService.setCustomFoods(this.customFoods);
  }

}
