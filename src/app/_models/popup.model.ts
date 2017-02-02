let types = ['success', 'info', 'warning', 'danger'];
let defaultType = 'info';

export class Popup {
  type?: string;
  text: string;
  dismissible?: boolean = true;
  delay?: number = 2500;
  timeoutID?: any = null;

  constructor(popup: Popup) {
    Object.assign(this, popup);
    if(types.indexOf(this.type) === -1) {
      this.type = defaultType;
    }
  }  
}