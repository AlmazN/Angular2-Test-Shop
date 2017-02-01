import { Injectable } from '@angular/core';
import { Popup } from '../_models/popup.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PopupService {

  private data: Popup[] = [];
  private dataSource = new Subject<Popup[]>();

  dataChange$ = this.dataSource.asObservable();

  doShow(settings: Popup): void {
    let popup = new Popup(settings);
    this.data.push(popup);
    if (popup.delay) {
      popup.timeoutID = setTimeout(() => {
        let index = this.data.indexOf(popup);
        if (index > -1) {
          this.data.splice(index, 1);
        }
      }, popup.delay);
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

  constructor() { }

}
