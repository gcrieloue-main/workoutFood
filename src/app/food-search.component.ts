import {Component, Input, Output, EventEmitter} from "@angular/core";
import {FoodService} from "./food.service";

@Component({
  selector: 'food-search',
  templateUrl: 'app/food-search.component.html',
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

  foods:Foods[];
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
      console.debug("food selected : " + food);
      this.onFoodSelected.emit(food);
    }
  }

}
