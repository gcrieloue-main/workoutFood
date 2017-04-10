import {Component, Input, OnDestroy, ViewChildren} from "@angular/core";
import {DataService} from "../shared/data.service";
import {Meal} from "../meal/meal";
import {Subscription} from "rxjs/Subscription";
import {Day} from "../shared/day";
import {MealFood} from "../shared/mealFood";
import {Profile} from "../calories/calories.component";

@Component({
  moduleId: module.id,
  selector: 'summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent {
  subscription: Subscription;
  subscriptionCalories: Subscription;
  subscriptionDay: Subscription;
  subscriptionProfile: Subscription;

  displaySummary: boolean = false;

  caloriesPercentage: number = 0;

  proteinsDay: number = 0;
  proteinsPerDay: number = 0;
  proteinsPercentage: number = 0;

  fatsDay: number = 0;
  fatsPerDay: number = 0;
  fatsPercentage: number = 0;

  carbohydratesDay: number = 0;
  carbohydratesPerDay: number = 0;
  carbohydratesPercentage: number = 0;

  weekCalories: number = 0;
  weekCaloriesPercentage: number = 0;

  weekProteins: number = 0;
  weekProteinsPercentage: number = 0;

  weekFats: number = 0;
  weekFatsPercentage: number = 0;

  weekCarbohydrates: number = 0;
  weekCarbohydratesPercentage: number = 0;

  caloriesDay: number = 0;
  caloriesBase: number = 0;

  Math: any;

  constructor(private dataService: DataService) {
    this.subscription = this.dataService.mealChanged$.subscribe(
      (meal: Meal) => {
        this.compute();
      });
    this.subscriptionCalories = this.dataService.caloriesBaseChanged$.subscribe(
      (calories: number) => {
        this.caloriesBase = calories;
        this.compute();
      });
    this.subscriptionDay = this.dataService.dayChanged$.subscribe(
      (day: Day) => {
        this.compute()
      });
    this.subscriptionProfile = this.dataService.profileChanged$.subscribe(
      (profile: Profile) => {
        this.compute()
      });
    this.Math = Math;
  }

  ngOnInit() {
    this.compute();
  }

  compute(): void {
    console.log("compute summary");

    this.displaySummary = false;

    var proteins: number = 0;
    var carbohydrates: number = 0;
    var fats: number = 0;
    var day = this.dataService.getSelectedDay();
    for (let meal of day.meals) {
      for (let food of meal.mealFoods) {
        proteins += food.weight * food.food.proteins / 100;
        carbohydrates += food.weight * food.food.carbohydrates / 100;
        fats += food.weight * food.food.fats / 100;

        this.displaySummary = true;
      }
    }

    if (this.caloriesBase <= 0) {
      this.displaySummary = false;
    }

    this.computeDay();
    this.computeWeek();
  }

  computeDay(): void {
    console.debug("compute day")
    var calories: number = 0;
    var proteins: number = 0;
    var carbohydrates: number = 0;
    var fats: number = 0;
    var day: Day = this.dataService.getSelectedDay();
    for (let meal of day.meals) {
      for (let food of meal.mealFoods) {
        proteins += food.weight * food.food.proteins / 100;
        carbohydrates += food.weight * food.food.carbohydrates / 100;
        fats += food.weight * food.food.fats / 100;
        calories += food.weight * food.food.calories / 100;
      }
    }
    this.caloriesDay = calories;
    this.proteinsDay = proteins;
    this.fatsDay = fats;
    this.carbohydratesDay = carbohydrates;

    this.caloriesPercentage = (calories * 100) / this.caloriesBase;
    console.debug("caloriesPercentage : " + this.caloriesPercentage + " (calories : " + calories + ", base: " + this.caloriesBase + ")");

    var caloriesPerProteinGram = 4;
    if (this.dataService.getProfile() != undefined) {
      var weight = this.dataService.getProfile().weight;
      var proteinsPerKg = 2;
      if (weight > 0) {
        this.proteinsPerDay = this.dataService.getProfile().weight * proteinsPerKg;
        this.proteinsPercentage = (proteins * 100) / this.proteinsPerDay;
        console.debug("proteinsPercentage : " + this.proteinsPercentage + " (proteins : " + proteins + ", proteins per day: " + this.proteinsPerDay + ")");
      }
    }

    var caloriesPerFatGram = 9;
    this.fatsPerDay = (this.caloriesBase * 20 / 100) / caloriesPerFatGram;
    this.fatsPercentage = (fats * 100) / this.fatsPerDay;
    console.debug("fatsPercentage : " + this.fatsPercentage + " (fats : " + fats + ", fats per day: " + this.fatsPerDay + ")");

    if (this.proteinsPerDay > 0) {
      var caloriesPerCarbohydratesGram = 4;
      var proteinsCalories = this.proteinsPerDay * caloriesPerProteinGram;
      var fatsCalories = this.fatsDay * caloriesPerFatGram;
      var carbohydratesCaloriesDay = this.caloriesBase - fatsCalories - proteinsCalories;
      this.carbohydratesPercentage = (this.carbohydratesDay * caloriesPerCarbohydratesGram) * 100 / carbohydratesCaloriesDay;
      this.carbohydratesPerDay = carbohydratesCaloriesDay / caloriesPerCarbohydratesGram;
      console.debug("carbohydratesPercentage : " + this.carbohydratesPercentage + ", calories base : " + this.caloriesBase + ", fats calories : " + this.fatsPerDay + ", proteins calories : " + proteinsCalories + ")");
    }

    this.doughnutChartData = [Math.ceil(this.proteinsDay), Math.ceil(this.carbohydratesDay), Math.ceil(this.fatsDay)];
  }

  computeWeek(): void {
    console.debug("compute week")
    var calories: number = 0;
    var proteins: number = 0;
    var carbohydrates: number = 0;
    var fats: number = 0;
    var days = this.dataService.getDays();
    for (let day of days) {
      for (let meal of day.meals) {
        for (let food of meal.mealFoods) {
          proteins += food.weight * food.food.proteins / 100;
          carbohydrates += food.weight * food.food.carbohydrates / 100;
          fats += food.weight * food.food.fats / 100;
          calories += food.weight * food.food.calories / 100;
        }
      }
    }
    this.weekCalories = calories / days.length;
    this.weekCaloriesPercentage = this.weekCalories * 100 / this.caloriesBase;
    console.debug("week caloriesPercentage : " + this.weekCaloriesPercentage + " (calories : " + calories + ", base: " + this.caloriesBase + ")");

    var proteinsPerDay = 0;
    var caloriesPerProteinGram = 4;
    if (this.dataService.getProfile() != undefined) {
      var weight = this.dataService.getProfile().weight;
      var proteinsPerKg = 2;
      if (weight > 0) {
        proteinsPerDay = this.dataService.getProfile().weight * proteinsPerKg;
        this.weekProteins = proteins / days.length;
        this.weekProteinsPercentage = this.eekProteins * 100 / proteinsPerDay;
        console.debug("week proteinsPercentage : " + this.weekProteinsPercentage + " (proteins : " + proteins + ", proteins per day: " + proteinsPerDay + ")");
      }
    }

    var caloriesPerFatGram = 9;
    var fatsPerDay = this.caloriesBase * 20 / 100;
    this.weekFats = (fats * caloriesPerFatGram) / days.length
    this.weekFatsPercentage = this.weekFats * 100 / fatsPerDay;
    console.debug("week fatsPercentage : " + this.weekFatsPercentage + " (fats : " + fats + ", fats per day: " + fatsPerDay + ")");

    if (proteinsPerDay > 0) {
      var caloriesPerCarbohydratesGram = 4;
      var proteinsCalories = proteinsPerDay * caloriesPerProteinGram;
      var carbohydratesPerDay = this.caloriesBase - fatsPerDay - proteinsCalories;
      this.weekCarbohydrates = (carbohydrates * caloriesPerCarbohydratesGram) / days.length;
      this.weekCarbohydratesPercentage = this.weekCarbohydrates * 100 / carbohydratesPerDay;
      console.debug("week carbohydratesPercentage : " + this.weekCarbohydratesPercentage + ", calories base : " + this.caloriesBase + ", fats calories : " + fatsPerDay + ", proteins calories : " + proteinsCalories + ")");
    }
  }

  // Doughnut
  public doughnutChartLabels: string[] = ['Proteins', 'Carbohydrates', 'Fats'];
  public doughnutChartData: number[] = [0, 0, 0];
  public doughnutChartType: string = 'doughnut';

  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
    this.subscriptionCalories.unsubscribe();
    this.subscriptionDay.unsubscribe();
    this.subscriptionProfile.unsubscribe();
  }

}
