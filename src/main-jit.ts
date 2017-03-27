import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";
import {AppModule} from "./app/app.module";

if (/www\.workout-food\.com/.test(document.location.host)) {
  enableProdMode();
}

console.log('Running JIT')
platformBrowserDynamic().bootstrapModule(AppModule);
