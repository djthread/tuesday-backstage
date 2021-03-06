import {State} from "./state";
import {inject} from "aurelia-framework";
import {Cookie} from "aurelia-cookie";
import {Router} from "aurelia-router";

@inject(State, Router)
export class Login {
  constructor(state, router) {
    this.state    = state;
    this.router   = router;
    this.username = Cookie.get("username") || "";
    this.password = "";
  }

  attached() {
    // this.login();
  }

  login() {
    var state = this.state,
        sadCb = () => state.flashMsg("Nope.");

    this.username = this.username.trim();
    this.password = this.password.trim();

    Cookie.set("username", this.username);

    var happyCb = () => {
      this.router.navigateToRoute("shows");
    };

    state.login(this.username, this.password, happyCb, sadCb);
  }
}
