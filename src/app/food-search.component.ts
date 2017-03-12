import {Component} from "@angular/core";

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
    `]
})
export class FoodSearchComponent {

  @Input()
  foods:Food[];

  foodName: string;

  selectedFood: any = this.foods[0];

  public foodSelected(food:any) {
    log.info(food.name + " selected");
    this.foodName = food ? food.name : 'none';
  }

}
