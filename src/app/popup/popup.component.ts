import { Component, OnInit } from '@angular/core';
import { Popup } from '../_models/popup.model';
import { PopupService } from '../_services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  host: {
    class: 'popup'
  }
})
export class PopupComponent implements OnInit {

  popupData: Popup[] = [];

  constructor(private popupService: PopupService) {
    popupService.dataChange$.subscribe(data => {
      this.popupData = data;
    });
  }

  closePopup(popup: Popup) {
    this.popupService.closePopup(popup);
  }

  ngOnInit() {
  }

}
