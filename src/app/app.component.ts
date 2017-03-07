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
      <form (ngSubmit)="onSubmit()" #caloriesBaseForm="ngForm" *ngIf="compute">
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Age</label>
            <div class="col-sm-10">
              <input class="form-control" type="number" [(ngModel)]="profile.age" name="age" placeholder="example: 30" >
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Taille</label>
            <div class="col-sm-10 input-group">
              <input class="form-control" type="number" [(ngModel)]="profile.size" name="size" placeholder="example: 180">
              <div class="input-group-addon">cm</div>
            </div>
        </div>
        <div class="form-group row">
             <label class="col-sm-2 col-form-label">Poids</label>
             <div class="col-sm-10 input-group">
                <input class="form-control"  type="number" [(ngModel)]="profile.weight" name="weight" placeholder="example: 75" >
                <div class="input-group-addon">kg</div>
            </div>
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
      </form>
      <div class="mrt-3">
        <div>
          <button (click)="toggleCompute()" *ngIf="!compute" class="btn btn-success">Calculer</button>
        </div>
        <div>
          <span>Calories par jour : <span class="badge badge-info">{{calories}}</span></span>
        </div>
      </div>
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
    size: undefined,
    weight: undefined,
    age: undefined
  };
  calories = 0;
  compute = false;

  mealFoods:MealFood[] = []

  computeCalories():void {
    if (this.profile.age != undefined && this.profile.size != undefined && this.profile.weight != undefined) {
      if (this.profile.age <= 30) {
        this.calories = Math.ceil(14.4 * this.profile.weight + 313 * this.profile.size / 100 + 113);
      }
    }
  }

  onSubmit():void {
    this.computeCalories();
    if (this.calories > 0) {
      this.toggleCompute();
    }
  }

  onFoodSelected(food:MealFood) {
    this.mealFoods.push(food);
    // create a new array (copy of the first one) to trigger ngOnChanges on meal component.
    this.mealFoods = this.mealFoods.slice(0)
  }

  toggleCompute():void {
    console.log(this.compute);
    this.compute = !this.compute;
  }

}
