import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";
import {AppModuleNgFactory} from "../aot/src/app/app.module.ngFactory";

if (/www\.workout-food\.com/.test(document.location.host)) {
  enableProdMode();
}

console.log('Running AOT compiled');
platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory);
