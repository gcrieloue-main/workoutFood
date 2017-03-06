import {Component, Output, EventEmitter} from '@angular/core';

import {Food} from './food'

@Component({
  selector: 'food-selector',
  template: `
<form (ngSubmit)="selectFood">
  <div>
      <label>Name</label>
      <input [(ngModel)]="food.name" name="name" >
  </div>
  <div>
      <label>Calories</label>
      <input [(ngModel)]="food.calories"  name="calories" >
  </div>
  <div>
      <label>Protéines</label>
      <input [(ngModel)]="food.proteins" name="proteins" >
  </div>
  </form>`
})
export class FoodComponent {

  food = new Food("test", 0, 0, 0, 0);
  @Output() onFoodSelected = new EventEmitter<Food>();

  selectFood():void {
    console.log("food selected");
    this.onFoodSelected(new Food("dinde", 5, 10, 15, 20));
  }
}
