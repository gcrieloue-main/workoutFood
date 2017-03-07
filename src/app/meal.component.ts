import {Component, Input} from "@angular/core";
import {Food} from "./food";


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
  foods: Food[];

  caloriesTotal = 0;

  ngOnChanges(changes) {
    console.log(changes);
    this.caloriesTotal = Math.ceil(this.foods.map((food)=>food.calories).reduce((c1, c2)=>c1+c2));
  }

}
