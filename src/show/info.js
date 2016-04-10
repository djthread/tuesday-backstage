import {inject} from "aurelia-framework";
import {State} from "../state";

@inject(State)
export class Info {

  constructor(state) {
    this.state = state;
  }

  attached() {
    console.log('attached show', this.show);
    this.show = this.state.show;
  }

  submit() {
    var args, state = this.state;

    args = { show: {
      id:         this.show.id,
      tiny_info:  this.show.tiny_info,
      short_info: this.show.short_info,
      full_info:  this.show.full_info
    }};

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
