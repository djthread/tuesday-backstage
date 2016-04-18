import {inject} from "aurelia-framework";
import {State} from "../state";

@inject(State)
export class Info {

  constructor(state) {
    this.state = state;
    console.log('CONSTRUCTORSTATE', state);
  }

  submit() {
    console.log('SUBMITSTATE', this.state);
    var args, state = this.state;

    args = { show: {
      id:         state.show.id,
      tiny_info:  state.show.tiny_info,
      short_info: state.show.short_info,
      full_info:  state.show.full_info
    }};

    console.log('args', args);

    state.push("save_info", args, () => {
      console.log("woop", arguments);
      state.getShow(state.show.id, () => {
        state.flashMsg("Info saved!");
        // this.router.navigateToRoute("episodes");
      });
    }.bind(this), (ret) => {
      this.errors = ret.errors;
      console.log('uhh', arguments);
      console.log('ERRORS', this.errors);
    }.bind(this));
  }
}
