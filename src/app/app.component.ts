import {Component, NgZone} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private _zone: NgZone) {

  }

  ngAfterViewInit() {
  }

}
