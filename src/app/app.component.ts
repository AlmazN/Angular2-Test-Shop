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
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');

    let browserLang = translate.getBrowserLang();

    cookie.get('lang') ? translate.use(cookie.get('lang')) : translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      cookie.put('lang', event.lang);
    });
  }
}
