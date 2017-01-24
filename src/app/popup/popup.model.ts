export class Popup {
  type: string;
  text: string;
  dismissible: boolean;
  delay: number;

  constructor(type: string, text: string, dismissible: boolean, delay: number) {
    this.type = type;
    this.text = text;
    this.dismissible = dismissible;
    this.delay = delay;
  }  
}