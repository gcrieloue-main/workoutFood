import { Component } from '@angular/core';


export class Profile{
    size: number;
    weight:number;
    age:number;
}

@Component({
  selector: 'my-app',
  template: `
  <h1>Alimentation</h1>
  <span>Calories par jour : {{calories}}</span>
  <div>
      <label>Age</label>
      <input [(ngModel)]="profile.age" (change)="onChange()" >
  </div>
  <div>
      <label>Taille</label>
      <input [(ngModel)]="profile.size" (change)="onChange()" >
  </div>
  <div>
      <label>Poids</label>
      <input [(ngModel)]="profile.weight" (change)="onChange()" >
  </div>`
})
export class AppComponent  { 
    profile : Profile = {
    size :1.82,
    weight: 75,
    age: 30
    };
    name = 'Angular'; 
    calories = 0;

    computeCalories():void{
        console.log('called');
        if (this.profile.age <= 30){
            this.calories = 14.4*this.profile.weight+313*this.profile.size+113;
        }
    }


    onChange():void{
        this.computeCalories();
    }

}
