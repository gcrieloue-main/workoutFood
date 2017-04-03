import {Component, Input} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DataService} from "../shared/data.service";

export class Profile {
  gender: string;
  size: number;
  weight: number;
  age: number;
  activityIntensity: number;
}

@Component({
  moduleId: module.id,
  selector: 'calories-selector',
  templateUrl: './calories.component.html'
})
export class CaloriesComponent {

  profile: Profile = {
    gender: 'male',
    size: undefined,
    weight: undefined,
    age: undefined,
    activityIntensity: 0
  };

  compute: boolean = false;
  calories: number = 0;

  caloriesBaseForm: FormGroup;

  formErrors = {
    'name': '',
    'power': ''
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.',
      'forbiddenName': 'Someone named "Bob" cannot be a hero.',
      'min': 'test'
    },
    'power': {
      'required': 'Power is required.'
    }
  };

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.debug("ngAfterViewInit");
    setTimeout(() => {
      let profile = this.dataService.loadProfile();
      if (profile != null) this.profile = profile;
      let calories = this.dataService.loadCaloriesBase();
      if (calories != null) this.calories = calories;
    }, 1);
  }

  computeCalories(): void {
    console.debug("compute calories")
    if (this.profile.age != undefined && this.profile.size != undefined && this.profile.weight != undefined) {
      var factor1: number, factor2: number, factor3: number;
      if (this.profile.gender == 'male') {
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
          factor3 = -137;
        }
        else if (this.profile.age > 60) {
          factor1 = 11.4;
          factor2 = 541;
          factor3 = -256;
        }
      }
      else {
        if (this.profile.age <= 18) {
          factor1 = 9.40;
          factor2 = 249;
          factor3 = 462;
        }
        else if (this.profile.age <= 30) {
          factor1 = 10.4;
          factor2 = 615;
          factor3 = -282;
        }
        else if (this.profile.age <= 60) {
          factor1 = 8.18;
          factor2 = 502;
          factor3 = -11.6;
        }
        else if (this.profile.age > 60) {
          factor1 = 8.52;
          factor2 = 421;
          factor3 = 10.7;
        }
      }
      var metabolicRate = Math.ceil(factor1 * this.profile.weight + factor2 * this.profile.size / 100 + factor3);
      console.debug("metabolic rate : " + metabolicRate);
      console.debug("activity intensity : " + this.profile.activityIntensity);
      this.calories = Math.ceil(metabolicRate * this.profile.activityIntensity);
      this.dataService.setCaloriesBase(this.calories);
      this.onCaloriesChange(this.calories);
    }
  }

  onSubmit(): void {
    this.dataService.setProfile(this.profile);
    this.computeCalories();
    if (this.calories > 0) {
      this.toggleCompute();
    }
  }

  onProfileChange(): void {
    this.dataService.setProfile(this.profile);
    this.onValueChanged();
  }

  onCaloriesChange(calories: number) {
    this.calories = calories;
    this.dataService.setCaloriesBase(this.calories);
  }

  toggleCompute(): void {
    this.compute = !this.compute;
  }

  onValueChanged() {
    console.info("onValueChanged");
    if (!this.caloriesBaseForm) {
      return;
    }
    const form = this.caloriesBaseForm;
    for (const field in this.formErrors) {
      console.info("field:" + field);
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}
