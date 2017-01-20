import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selfclosing-alert',
  templateUrl: './selfclosing-alert.component.html'
})
export class SelfclosingAlertComponent implements OnInit {
  alertClosed: boolean = false;

  ngOnInit() {
    setTimeout(() => this.alertClosed = true, 2000);
  }

}
