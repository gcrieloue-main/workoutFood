import {Component, Output, EventEmitter} from "@angular/core";
import {FoodService} from "app/food/food.service";

@Component({
  moduleId: module.id,
  selector: 'food-list-selector',
  templateUrl: './food-list.component.html',
  providers: [FoodService]
})
export class FoodListComponent {

  constructor(private foodService:FoodService) {

  }

}
