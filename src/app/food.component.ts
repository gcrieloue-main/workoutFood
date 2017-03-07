import {Component, Output, EventEmitter} from "@angular/core";
import {Food} from "./food";
import {FoodService} from "./food.service";

@Component({
  selector: 'food-selector',
  template: `
<form (ngSubmit)="onSubmit()" #foodSelectorForm="ngForm">
  <input type="number" name="weight" [(ngModel)]="weight"></form>
  <select [(ngModel)]="food" name="food">
    <option *ngFor="let food of foods" [ngValue]="selectedFood">{{food.name}}</option>
  </select>
   <button type="submit" class="btn btn-success">Submit</button>
  </form>`,
  providers: [FoodService]
})
export class FoodComponent {

  selectedFood: Food;
  foods: Food[];

  constructor(private foodService: FoodService) {

  }

  ngOnInit(): void {
    this.foods = this.foodService.getFoods();
  }

  @Output() onFoodSelected = new EventEmitter<MealFood>();

  onSubmit(): void {
    console.log(this.food.name + " selected");
    this.onFoodSelected.emit(new MealFood(this.selectedFood, this.weight));
  }
}
