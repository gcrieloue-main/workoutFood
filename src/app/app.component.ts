import {Component} from "@angular/core";
import {MealFood} from "./mealFood";
import {DataService} from "./data.service";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers: [DataService]
})
export class AppComponent {
  calories:number = 0;

  constructor(private dataService: DataService){

  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.dataService.load();
    }, 1);
  }

  onFoodSelected(food:MealFood) {
    console.debug("food selected : " + JSON.stringify(food));
    //test service
    this.dataService.addMealFood(food);
  }
}
