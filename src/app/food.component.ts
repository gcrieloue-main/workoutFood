import {Component, Output, EventEmitter} from '@angular/core';

import {Food} from './food'

@Component({
  selector: 'food-selector',
  template: `
<form (ngSubmit)="selectFood">
  <div>
      <label>Name</label>
      <input [(ngModel)]="food.name" >
  </div>
  <div>
      <label>Calories</label>
      <input [(ngModel)]="food.calories"  >
  </div>
  <div>
      <label>Protéines</label>
      <input [(ngModel)]="food.proteins"  >
  </div>
  </form>`
})
export class FoodComponent {

  food = new Food("test", 0, 0, 0, 0);
  @Output() onFoodSelected = new EventEmmitter<Food>();

  selectFood():void {
    this.onFoodSelected(food);
  }
}
