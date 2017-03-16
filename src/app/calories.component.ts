import {Component, Input} from "@angular/core";
import {DataService} from "./data.service";

export class Profile {
  size:number;
  weight:number;
  age:number;
  activityIntensity:number;
}

@Component({
  selector: 'calories-selector',
  templateUrl: 'app/calories.component.html'
})
export class CaloriesComponent {

  profile:Profile = {
    size: undefined,
    weight: undefined,
    age: undefined,
    activityIntensity: 0
  };

  compute:boolean = false;
  calories:number = 0;

  constructor(private dataService:DataService) {

  }

  ngOnInit():void {
    console.debug("ngOnInit");
  }

  ngAfterViewInit() {
    console.debug("ngAfterViewInit");
    setTimeout(()=> {
      let profile = this.dataService.loadProfile();
      if (profile != null) this.profile = profile;
      let calories = this.dataService.loadCaloriesBase();
      if (calories != null) this.calories = calories;
    }, 1);
  }

  computeCalories():void {
    console.debug("compute calories")
    if (this.profile.age != undefined && this.profile.size != undefined && this.profile.weight != undefined) {
      var factor1:number, factor2:number, factor3:number;
      if (this.profile.age <= 18) {
        factor1 = 15.6;
        factor2 = 266;
        factor3 = 299;
      }
      else if (this.profile.age <= 30) {
        factor1 = 14.4;
        factor2 = 313;
        factor3 = 113;
      }
      else if (this.profile.age <= 60) {
        factor1 = 11.4;
        factor2 = 541;
        factor3 = 137;
      }
      else if (this.profile.age > 60) {
        factor1 = 11.4;
        factor2 = 541;
        factor3 = 256;
      }
      var metabolicRate = Math.ceil(factor1 * this.profile.weight + factor2 * this.profile.size / 100 + factor3);
      console.debug("metabolic rate : " + metabolicRate);
      console.debug("activity intensity : " + this.profile.activityIntensity);
      this.calories = Math.ceil(metabolicRate * this.profile.activityIntensity);
      this.dataService.setCaloriesBase(this.calories);
      this.onCaloriesChange(this.calories);
    }
  }


  onSubmit():void {
    localStorage.setItem('profile', JSON.stringify(this.profile));
    this.computeCalories();
    if (this.calories > 0) {
      this.toggleCompute();
    }
  }

  onCaloriesChange(calories:number) {
    this.calories = calories;
    this.dataService.setCaloriesBase(this.calories);
  }

  toggleCompute():void {
    this.compute = !this.compute;
  }
}
