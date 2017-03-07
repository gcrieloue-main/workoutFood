import {Component, Output, EventEmitter} from "@angular/core";
import {Food} from "./food";
import {FoodService} from "./food.service";
import {MealFood} from "./mealFood";

@Component({
  selector: 'food-selector',
  template: `
<form class="form-inline" (ngSubmit)="onSubmit()" #foodSelectorForm="ngForm">
  <div class="input-group mr-2">
    <input class="form-control" type="number" name="weight" [(ngModel)]="weight" placeholder="100">
    <div class="input-group-addon">g</div>
  </div>
  <select [(ngModel)]="selectedFood" name="food" class="form-control mr-2">
    <option *ngFor="let selectedFood of foods" [ngValue]="selectedFood">{{selectedFood.name}}</option>
  </select>
   <button type="submit" class="btn btn-success">Ajouter</button>
  </form>`,
  providers: [FoodService]
})
export class FoodComponent {

  selectedFood: Food;
  foods: Food[];
  weight: number;

  constructor(private foodService: FoodService) {

  }

  ngOnInit(): void {
    this.foods = this.foodService.getFoods();
  }

  @Output() onFoodSelected = new EventEmitter<MealFood>();

  onSubmit(): void {
    if (this.selectedFood !== undefined) {
      console.log(this.selectedFood.name + " selected");
      this.onFoodSelected.emit(new MealFood(this.selectedFood, (this.weight !== undefined && this.weight > 0 ? this.weight : 100)));
    }
  }
}
