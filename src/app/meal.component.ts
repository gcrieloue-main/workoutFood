import {Component, Input} from "@angular/core";
import {Food} from "./food";


@Component({
  selector: 'meal',
  template: `
  <div *ngFor="let mealFood of foods">
    <span>{{mealFood.weight}}</span>
    <span>{{mealFood.food.name}}</span>
    <span>{{mealFood.food.calories}}</span>
  </div>
  <div>Total calorique : {{caloriesTotal}}</div>
  `
})
export class MealComponent {

  @Input()
  foods: MealFood[];

  caloriesTotal = 0;

  ngOnChanges(changes) {
    this.caloriesTotal = Math.ceil(this.foods.map((mealFood)=>mealFood.food.calories).reduce((c1, c2)=>c1+c2));
  }

}
