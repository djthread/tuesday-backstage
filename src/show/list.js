import {State} from "../state";
import {inject} from "aurelia-framework";

@inject(State)
export class List {

  constructor(state) {
    this.state = state;
  }

  activate() {
    console.log('ACTIVATE>EEE');

    return new Promise((accept, reject) => {
      console.log('going....');
      this.state.push(
        "episodes", {show_id: this.state.show().id},
        (episodes) => {
          console.log('done!');
          this.episodes = episodes;
          accept();
        }
      );
    }.bind(this));
  }
}
