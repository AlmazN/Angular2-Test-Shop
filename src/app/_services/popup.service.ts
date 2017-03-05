import { Injectable } from '@angular/core';
import { Popup } from '../_models/popup.model';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from 'ng2-translate';

@Injectable()
export class PopupService {

  private data: Popup[] = [];
  private dataSource = new Subject<Popup[]>();

  dataChange$ = this.dataSource.asObservable();

  showPopup(settings: Popup): void {
    let popup = new Popup(settings);
    this.data.push(popup);
    if (popup.delay) {
      popup.timeoutID = setTimeout(() => {
        let index = this.data.indexOf(popup);
        if (index > -1) {
          this.data.splice(index, 1);
        }
      }, popup.delay);
      popup.i18n === true ? this.translate.get(popup.text).subscribe(res => popup.text = res) : null;
      this.dataSource.next(this.data);
    }
  }

  closePopup(popup: Popup) {
    let index = this.data.indexOf(popup);
    if (index > -1) {
      this.data.splice(index, 1);
    }

    if (popup.delay) {
      clearTimeout(popup.timeoutID);
    }
    this.dataSource.next(this.data);
  }

  constructor(private translate: TranslateService) { }

}
