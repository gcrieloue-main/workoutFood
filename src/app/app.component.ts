import {Component} from "@angular/core";

import {Food} from "./food"

export class Profile {
  size:number;
  weight:number;
  age:number;
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
      <form (ngSubmit)="onSubmit()" #caloriesBaseForm="ngForm">
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Age</label>
            <div class="col-sm-10">
              <input class="form-control" type="number" [(ngModel)]="profile.age" name="age" >
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Taille</label>
            <div class="col-sm-10 input-group">
              <input class="form-control" type="number" [(ngModel)]="profile.size" name="size" >
              <div class="input-group-addon">cm</div>
            </div>
        </div>
        <div class="form-group row">
             <label class="col-sm-2 col-form-label">Poids</label>
             <div class="col-sm-10 input-group">
                <input class="form-control"  type="number" [(ngModel)]="profile.weight" name="weight" >
                <div class="input-group-addon">kg</div>
            </div>
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
      </form>
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
</div>
  `
})
export class AppComponent {
  profile:Profile = {
    size: 1.82,
    weight: 75,
    age: 30
  };
  calories = 0;

  mealFoods:MealFood[] = [
  ]

  computeCalories(): void {
    if (this.profile.age <= 30) {
      this.calories = Math.ceil(14.4 * this.profile.weight + 313 * this.profile.size/100 + 113);
    }
  }

  onSubmit():void {
    this.computeCalories();
  }

  onFoodSelected(food:MealFood) {
    this.mealFoods.push(food);
    // create a new array (copy of the first one) to trigger ngOnChanges on meal component.
    this.mealFoods = this.mealFoods.slice(0)
  }

}
