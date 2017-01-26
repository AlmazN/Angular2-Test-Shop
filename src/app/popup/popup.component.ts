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
    let popup = new Popup(settings);
    this.data.push(popup);
    if(popup.delay) {
      popup.timeoutID = setTimeout(() => {
        let index = this.data.indexOf(popup);
        if(index > -1) {
          this.data.splice(index, 1);
        }
      }, popup.delay);
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
