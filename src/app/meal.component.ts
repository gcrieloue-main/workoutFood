import {Component, Input} from '@angular/core';

import {Food} from './food'


@Component({
  selector: 'meal',
  template: `
  <div *ngFor="let food of foods">
    <span>{{food.name}}</span>
    <span>{{food.calories}}</span>
  </div>
  `
})
export class MealComponent {

  @Input()
  foods:Food[];

}
