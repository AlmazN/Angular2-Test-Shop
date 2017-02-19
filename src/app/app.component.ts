import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private translate: TranslateService, private cookie: CookieService) {
    let availableLangs = ['en', 'ru'];

    translate.addLangs(availableLangs);
    translate.setDefaultLang('en');

    let browserLang = translate.getBrowserLang();

    translate.getLangs().indexOf(cookie.get('lang')) >= 0 ? translate.use(cookie.get('lang')) : 
    translate.use(availableLangs.indexOf(browserLang) >= 0 ? browserLang : 'en');

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      cookie.put('lang', event.lang);
    });
  }
}
