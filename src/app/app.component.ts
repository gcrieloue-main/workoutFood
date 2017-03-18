import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `<header>
  <div class="container">
    <h1>Workout Food</h1>
  </div>
</header>
<router-outlet></router-outlet>`
})
export class AppComponent {
}
