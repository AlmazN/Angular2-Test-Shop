import { Component, OnInit } from '@angular/core';
import { Popup } from './popup.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  host: {
    class: 'popup'
  }
})
export class PopupComponent implements OnInit {
  private data: Popup[] = [];


  doShow(settings: Popup): void {
    this.data.push(settings);
    if(settings.delay) {
      settings.timeoutID = setTimeout(() => {
        let index = this.data.indexOf(settings);
        if(index > -1) {
          this.data.splice(index, 1);
        }
      }, settings.delay);
    }
  }

  closePopup(popup: Popup) {
    let index = this.data.indexOf(popup);
    if(index > -1) {
      this.data.splice(index, 1);
    }

    if(popup.delay) {
      clearTimeout(popup.timeoutID);
    }
  }

  ngOnInit() {
  }

}
