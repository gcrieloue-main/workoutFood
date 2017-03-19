import {Component} from '@angular/core';
@Component({
  selector: 'my-app',
  template: `<header>
  <div class="container">
  <div class="d-flex flex-row justify-content-between"
    <h1>Workout Food</h1>
    <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
  <a class="navbar-brand" href="#">Navbar</a>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="core">Menu<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="foods">Aliments<span class="sr-only">(current)</span></a>
      </li>
    </ul>
  </div>
</nav>
  </div>
</header>
<router-outlet></router-outlet>`
})
export class AppComponent {
}
