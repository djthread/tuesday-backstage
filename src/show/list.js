import {State} from "../state";
import {inject} from "aurelia-framework";

@inject(State)
export class List {

  constructor(state) {
    this.state = state;
  }

  activate() {
    console.log('ACTIVATE>EEE');

    // return new Promise((accept, reject) => {
    //   console.log('going....', this.state.show);
    //   this.state.push(
    //     "show", {id: this.state.show.id},
    //     (result) => {
    //       console.log('SHOWWWW', result);
    //       this.episodes = result.show.episodes;
    //       console.log('done!', this.episodes);
    //       accept();
    //     }
    //   );
    // }.bind(this));
  }
}
