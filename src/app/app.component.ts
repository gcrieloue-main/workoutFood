import {Component} from "@angular/core";
import {MealFood} from "./mealFood";
import {DataService} from "./data.service";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers: [DataService]
})
export class AppComponent {
  mealFoods:MealFood[] = [];
  calories:number = 0;

  constructor(private dataService: DataService){

  }

  ngOnInit(){
    console.debug("ngOnInit");
    this.dataService.load();
  }

  ngAfterViewInit(){
    console.debug("ngAfterViewInit");
  }

  onFoodSelected(food:MealFood) {
    console.debug("food selected : " + JSON.stringify(food));
    this.mealFoods.push(food);
    // create a new array (copy of the first one) to trigger ngOnChanges on meal component.
    this.mealFoods = this.mealFoods.slice(0)

    //test service
    this.dataService.addMealFood(food);
  }
}
