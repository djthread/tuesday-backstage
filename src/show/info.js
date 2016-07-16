import {inject} from "aurelia-framework";
import {State} from "../state";

@inject(State)
export class Info {

  constructor(state) {
    this.state = state;
  }

  submit() {
    var args, state = this.state;

    args = { show: {
      id:         state.show.id,
      tiny_info:  state.show.tiny_info,
      short_info: state.show.short_info,
      full_info:  state.show.full_info
    }};

    state.push("save_info", args, () => {
      state.getShow(state.show.id, () => {
        state.flashMsg("Info saved!");
        // this.router.navigateToRoute("episodes");
      });
    }.bind(this), (ret) => {
      this.errors = ret.errors;
    }.bind(this));
  }
}
