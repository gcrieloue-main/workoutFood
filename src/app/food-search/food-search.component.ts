import {Component, Input, Output, EventEmitter} from "@angular/core";
import {FoodService} from "../food/food.service";
import {Food} from "../shared/food";

@Component({
  selector: 'food-search',
  templateUrl: './food-search.component.html',
  styles: [`
        .typeahead-input,
        .typeahead-typeahead{
            width: 250px;
            padding: 8px;
            border-radius: 5px;
        }
    `],
  providers: [FoodService]
})
export class FoodSearchComponent {

  foods:Food[];
  selectedFood:Food;

  @Output() onFoodSelected = new EventEmitter<Food>();

  @Input() weight:number;

  constructor(private foodService:FoodService) {

  }

  ngOnInit():void {
    this.foods = this.foodService.getFoods();
  }

  public foodSelected(food:Food) {
    if (food !== undefined && food != null) {
      console.debug("food selected : " + JSON.stringify(food));
      this.onFoodSelected.emit(food);
    }
  }

}
