import {Component, Input} from "@angular/core";
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

  ngOnInit(): void {
    this.foods = this.foodService.getFoods();
  }

  foodName: string;

  selectedFood: any = this.foods[0];

  public foodSelected(food:any) {
    log.info(food.name + " selected");
    this.foodName = food ? food.name : 'none';
  }

}
