import {Component} from "@angular/core";
import {MealFood} from "./mealFood";
import {DataService} from "./data.service";
import {Day} from "./day";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers: [DataService]
})
export class AppComponent {
  calories: number = 0;
  days: Day[];
  selectedDay: Day;

  constructor(private dataService: DataService) {
    console.debug("constructor");
    this.days = this.dataService.loadDays();
    if (this.days == null || this.days == undefined) {
      this.days = [this.dataService.newDay()];
    }
    this.selectedDay = this.days[0];
    this.dataService.setSelectedDay(this.selectedDay);
    this.dataService.setSelectedMeal(this.selectedDay.meals[0]);
  }

  ngAfterViewInit() {
    console.debug("ngAfterViewInit");
    setTimeout(()=> {

    }, 1);
  }

  addDay() {
    this.dataService.newDay();
  }

  selectDay(day: Day) {
    this.selectedDay = day;
    this.dataService.setSelectedDay(this.selectedDay);
    this.dataService.setSelectedMeal(this.selectedDay.meals[0]);
  }

  onFoodSelected(food: MealFood) {
    console.debug("food selected : " + JSON.stringify(food));
    //test service
    this.dataService.addMealFood(food);
  }

  isSelected(day: Day): boolean {
    return this.selectedDay == day;
  }
}
