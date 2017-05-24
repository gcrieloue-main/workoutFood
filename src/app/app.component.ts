import {Component, NgZone} from '@angular/core';

declare var gapi: any;

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  googleLoginButtonId = "google-login-button";

  constructor(private _zone: NgZone) {

  }

  ngAfterViewInit() {
    gapi.signin2.render(
      this.googleLoginButtonId,
      {
        "onSuccess": this.onGoogleLoginSuccess,
        "scope": "profile",
        "theme": "dark"
      }
    );
  }

  onGoogleLoginSuccess = (loggedInUser) => {
    this._zone.run(() => {
      this.userAuthToken = loggedInUser.getAuthResponse().id_token;
      this.userDisplayName = loggedInUser.getBasicProfile().getName();
      console.log(this);
    });
  }
}
