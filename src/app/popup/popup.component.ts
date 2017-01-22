import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  host: {
    class: 'popup'
  }
})
export class PopupComponent implements OnInit {
  @Input() text: string; //текст попапа
  @Input() dismissible: boolean; //можно ли закрыть вручную
  @Input() delay: number; //ms, если не задано, то попап не исчезает и его можно закрыть только вручную
  @Input() show: boolean = true; //флаг, отвечающий за показ попапа
  @Input() type: string; // success, info , warning , danger

  ngOnInit() {
    if (this.delay) {
      setTimeout(() => this.show = false, this.delay);
    }
  }

}
