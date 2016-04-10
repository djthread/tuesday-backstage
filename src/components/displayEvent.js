import {customElement, bindable} from "aurelia-framework";

@customElement("event-display")
export class EventDisplay {
  @bindable event;
}
