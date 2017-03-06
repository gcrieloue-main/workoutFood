import { Component } from '@angular/core';

import { Food } from './food'

@Component({
  selector: 'my-app',
  template: `
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
  </div>`
})
export class FoodComponent  { 

food = new Food("test",0,0,0,0);

}
