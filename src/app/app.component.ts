import {Component} from "@angular/core";
import {Food} from "./food";

export class Profile {
  size: number;
  weight: number;
  age: number;
}

@Component({
  selector: 'my-app',
  template: `
<div class="container">
  <h1>Alimentation</h1>
  <div class="card mt-3">
    <div class="card-header">
      Calculez votre base calorique
    </div>
    <div class="card-block">
      <div class="form-group row">
          <label class="col-sm-2 col-form-label">Age</label>
          <div class="col-sm-10">
            <input class="form-control" type="number" [(ngModel)]="profile.age" (change)="onChange()" >
          </div>
      </div>
      <div class="form-group row">
          <label class="col-sm-2 col-form-label">Taille</label>
          <div class="col-sm-10">
            <input class="form-control"  [(ngModel)]="profile.size" (change)="onChange()" >
          </div>
      </div>
      <div class="form-group row">
           <label class="col-sm-2 col-form-label">Poids</label>
           <div class="col-sm-10">
              <input class="form-control"  type="number" [(ngModel)]="profile.weight" (change)="onChange()" >
          </div>
      </div>
      <span>Calories par jour : {{calories}}</span>
    </div>
  </div>
  
  <div class="card mt-3">
    <div class="card-header">
      Choisissez un aliment
    </div>
    <div class="card-block">
      <food-selector (onFoodSelected)="onFoodSelected($event)"></food-selector>
    </div>
  </div>
  
  <div class="card mt-3">
    <div class="card-header">
      Votre menu
    </div>
    <div class="card-block">
      <meal [foods]="mealFoods"></meal>
    </div>
  </div>
  `
})
export class AppComponent {
  profile: Profile = {
    size: 1.82,
    weight: 75,
    age: 30
  };
  calories = 0;

  mealFoods: Food[] = [
    new Food("poulet", 5, 10, 15, 20)
  ]

  computeCalories(): void {
    if (this.profile.age <= 30) {
      this.calories = 14.4 * this.profile.weight + 313 * this.profile.size + 113;
    }
  }

  onChange(): void {
    this.computeCalories();
  }

  onFoodSelected(food: Food) {
    this.mealFoods.push(food);
  }

}
