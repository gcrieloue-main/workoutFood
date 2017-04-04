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

      this.loadForm();
    }, 1);
  }

  loadForm(): void {
    this.profileForm.patchValue({
      gender: this.profile.gender,
      size: this.profile.size,
      age: this.profile.age,
      weight: this.profile.weight,
      activityIntensity: this.profile.activityIntensity,
      calories: this.calories
    });
  }

  buildForm(): void {
    this.profileForm = this.formBuilder.group({
      gender: [
        '',
        [Validators.required]
      ],
      size: [
        '',
        [Validators.required]
      ],
      age: [
        '',
        [Validators.required]
      ],
      weight: [
        '',
        [Validators.required]
      ],
      activityIntensity: [
        '',
        [Validators.required]
      ],
      calories: [
        '',
        [Validators.required]
      ]
    });

    this.profileForm.valueChanges.subscribe(data=>this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.profileForm) {
      return;
    }

    this.profile.age = this.profileForm.value["age"];
    this.profile.gender = this.profileForm.value["gender"];
    this.profile.size = this.profileForm.value["size"];
    this.profile.weight = this.profileForm.value["weight"];
    this.profile.activityIntensity = this.profileForm.value["activityIntensity"];
    this.calories = this.profileForm.value["calories"];
    this.dataService.setProfile(this.profile);
  }

  computeCalories(): void {
    console.info("compute calories")
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
      this.profileForm.patchValue({calories: this.calories});
      this.dataService.setCaloriesBase(this.calories);
      this.onCaloriesChange(this.calories);
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (this.profileForm.status == "VALID") {
      this.computeCalories();
      if (this.calories > 0) {
        this.toggleCompute();
      }
    }
    else {
      this.errorMessage = "Certaines informations sont incorrectes."
    }
  }

  onCaloriesChange(calories: number) {
    this.calories = calories;
    this.dataService.setCaloriesBase(this.calories);
  }

  toggleCompute(): void {
    this.compute = !this.compute;
  }

}
