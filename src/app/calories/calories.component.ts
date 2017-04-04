import {Component, Input} from "@angular/core";
import {FormGroup, FormBuilder, Validators, NgForm} from "@angular/forms";
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

  profileForm: FormGroup;

  formErrors = {
    'size': ''
  };
  validationMessages = {
    'size': {
      'required': 'Size is required.'
    }
  };

  compute: boolean = false;
  calories: number = 0;

  constructor(private dataService: DataService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
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

  buildForm(): void {
    this.profileForm = this.formBuilder.group({
      'gender': [
        this.profile.gender,
        [Validators.required]
      ],
      'size': [
        this.profile.size,
        [Validators.required]
      ]
      ,
      'age': [
        this.profile.age,
        [Validators.required]
      ]
      ,
      'weight': [
        this.profile.weight,
        [Validators.required]
      ]
      ,
      'activityIntensity': [
        this.profile.activityIntensity,
        [Validators.required]
      ]
      ,
      'calories': [
        this.calories,
        [Validators.required]
      ]
    });

    this.profileForm.valueChanges.subscribe(data=>this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.profileForm) {
      return;
    }
    const form = this.profileForm;
    for (const field in this.formErrors) {
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
  }

  onCaloriesChange(calories: number) {
    this.calories = calories;
    this.dataService.setCaloriesBase(this.calories);
  }

  toggleCompute(): void {
    this.compute = !this.compute;
  }


}
