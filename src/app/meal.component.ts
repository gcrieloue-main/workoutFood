import {Component, Input} from '@angular/core';

import {Food} from './food'


@Component({
  selector: 'meal',
  template: `
  <div *ngFor="let food of foods">
    <span>{{food.name}}</span>
    <span>{{food.calories}}</span>
  </div>
  <div>Total calorique : {{caloriesTotal}}</div>
  `
})
export class MealComponent {

  @Input()
  foods:Food[];

  caloriesTotal = 0;
  
  ngOnChanges(changes) {
    this.caloriesTotal = this.foods.reduce((food1, food2)=>food1.calories + food2.calories);
  }

}
