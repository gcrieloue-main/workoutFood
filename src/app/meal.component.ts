import {Component, Input} from "@angular/core";


@Component({
  selector: 'meal',
  template: `
  <div *ngFor="let mealFood of foods">
    <span class="badge badge-info">{{mealFood.weight}}g</span>
    <span>{{mealFood.food.name}}</span>
    <span class="badge badge-warning">{{mealFood.food.calories}}</span>
  </div>
  <div>Total calorique : {{caloriesTotal}}</div>
  `
})
export class MealComponent {

  @Input()
  foods: MealFood[];

  caloriesTotal = 0;

  ngOnChanges(changes) {
    if (this.foods.length > 0) {
      this.caloriesTotal = Math.ceil(this.foods.map((mealFood)=>mealFood.weight * mealFood.food.calories / 100).reduce((c1, c2)=>c1 + c2));
    }
    else {
      this.caloriesTotal = 0;
    }
  }

}
