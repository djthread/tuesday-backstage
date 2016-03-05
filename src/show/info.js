import {inject} from "aurelia-framework";
import {State} from "../state";

@inject(State)
export class Info {

  constructor(state) {
    this.state = state;
  }

  // activate() {
  //   return new Promise((accept, reject) => {
  //     this.state.getInfo(() => {
  //       accept()
  //     });
  //   }.bind(this));
  // }
}
