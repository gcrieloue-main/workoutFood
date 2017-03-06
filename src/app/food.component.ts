import {Component, Output, EventEmitter} from '@angular/core';

import {Food} from './food';

import {FoodService} from './food.service';

@Component({
  selector: 'food-selector',
  template: `
<form (ngSubmit)="onSubmit()" #foodSelectorForm="ngForm">
  <select [(ngmodel)]="food">
    <option id="food" *ngFor="let food of foods" [value]="food">{{food.name}}</option>
  </select>
   <button type="submit" class="btn btn-success">Submit</button>
  </form>`,
  providers: [FoodService]
})
export class FoodComponent {

  constructor(private foodService:FoodService) {

  }

  ngOnInit():void {
    foods = this.foodService.getFoods();
  }

  food:Food;

  @Output() onFoodSelected = new EventEmitter<Food>();

  onSubmit():void {
    console.log(food.name);
    console.log("food selected");
    this.onFoodSelected.emit(new Food("dinde", 5, 10, 15, 20));
  }
}
