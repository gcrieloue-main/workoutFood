import {Component, Input, Output} from "@angular/core";
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

  foods : Foods[];
  selectedFood : Food;

  @Output() onFoodSelected = new EventEmitter<Food>();

  constructor(private foodService: FoodService) {

  }

  ngOnInit(): void {
    this.foods = this.foodService.getFoods();
    this.selectedFood = this.foods[0];
  }

  public foodSelected(food:Food) {
    if (food !== undefined && food != null){
      this.onFoodSelected.emit(selectedFood);
    }
  }

}
