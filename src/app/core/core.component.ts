import {Component} from "@angular/core";
import {MealFood} from "../shared/mealFood";
import {DataService} from "../shared/data.service";
import {Day} from "../shared/day";

@Component({
  moduleId: module.id,
  selector: 'workout-food',
  templateUrl: './core.component.html',
  providers: [DataService]
})
export class CoreComponent {
  calories:number = 0;
  days:Day[];
  selectedDay:Day;

  constructor(private dataService:DataService) {
    console.debug("constructor");
    this.days = this.dataService.loadDays();
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
    console.log(this.days.length);
  }

  selectDay(day:Day) {
    this.selectedDay = day;
    this.dataService.setSelectedDay(this.selectedDay);
    this.dataService.setSelectedMeal(this.selectedDay.meals[0]);
  }

  onFoodSelected(food:MealFood) {
    console.debug("food selected : " + JSON.stringify(food));
    //test service
    this.dataService.addMealFood(food);
  }

  isSelected(day:Day):boolean {
    return this.selectedDay == day;
  }

  remove(day:Day):void {
    this.dataService.removeDay(day);
    if (this.days.length == 0) {
      this.dataService.newDay();
    }
  }
}
