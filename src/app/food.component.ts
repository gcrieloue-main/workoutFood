import {Component, Output, EventEmitter} from '@angular/core';

import {Food} from './food';

import {FoodService} from './food.service';

@Component({
  selector: 'food-selector',
  template: `
<form (ngSubmit)="onSubmit()" #foodSelectorForm="ngForm">
  <select [(ngModel)]="food" name="food">
    <option *ngFor="let food of foods" [ngValue]="food">{{food.name}}</option>
  </select>
   <button type="submit" class="btn btn-success">Submit</button>
  </form>`,
  providers: [FoodService]
})
export class FoodComponent {

  food:Food;
  foods:Food[];

  constructor(private foodService:FoodService) {

  }

  ngOnInit():void {
    this.foods = this.foodService.getFoods();
  }

  @Output() onFoodSelected = new EventEmitter<Food>();

  onSubmit():void {
    console.log(this.food.name+" selected");
    this.onFoodSelected.emit(this.food);
  }
}
