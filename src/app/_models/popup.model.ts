let types = ['success', 'info', 'warning', 'danger'];
let defaultType = 'info';

export class Popup {
  type?: string;
  text: string;
  dismissible?: boolean = true;
  delay?: number = 2500;
  timeoutID?: any = null;

  constructor(popup: Popup) {
    this.type = types.indexOf(popup.type) === -1 ? defaultType : popup.type;
    this.text = popup.text;
    this.dismissible = popup.dismissible;
    this.delay = popup.delay;
    this.timeoutID = null;
  }  
}