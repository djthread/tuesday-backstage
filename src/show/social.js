import {inject} from "aurelia-framework";
import {State} from "../state";

@inject(State)
export class Social {

  constructor(state) {
    this.state = state;
    this.success = null;

    this.social = {
      fb_rtmp_uri: ""
    };
  }

  submit() {
    this.success = null;

    this.state.push('to_fb', {url: this.social.fb_rtmp_url}, (res) => {
      this.success = res.status === "ok";
    }.bind(this));
  }
}
