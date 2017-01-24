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
  private data: Popup[];
  type: string;
  text: string;
  dismissible: boolean;
  delay: number;
  show: boolean = true; 
  popup: Popup;

  doShow(settings: Popup): void {
    this.data.push(settings);
    if(settings.delay) {
      setTimeout(() => {
        this.show = false;
        let index = this.data.indexOf(settings);
        if(index > -1) {
          this.data.splice(index, 1);
        }
      }, settings.delay);
    }
  }

  ngOnInit() {
  }

}
