import {Component, Output, EventEmitter} from "@angular/core";
import {FoodService} from "../food/food.service";

@Component({
  moduleId: module.id,
  selector: 'food-list-selector',
  templateUrl: './food-list.component.html',
  providers: [FoodService]
})
export class FoodListComponent {

  foods:Food[];

  customFood:Food;

  constructor(private foodService:FoodService) {
    this.foods = foodService.getFoods();
  }

}
