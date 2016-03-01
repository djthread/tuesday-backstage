import {State} from "./state";
import {inject} from "aurelia-framework";
import {Cookie} from "aurelia-cookie";
import {Router} from "aurelia-router";

@inject(State, Router)
export class Login {
  constructor(state, router) {
    this.state    = state;
    this.router   = router;
    this.username = Cookie.get("username");
    this.message  = "";
  }

  login() {
    var state = this.state;
    var sadCb = () => this.message = "Nope.";

    this.username = this.username.trim();
    this.password = this.password.trim();

    Cookie.set("username", this.username);

    var happyCb = () => {
      state.push("whoami", {}, (stuff) => {
        console.log('stuff', stuff);
        state.shows = stuff.shows;
        state.user  = stuff.user;
        if (stuff.shows.length === 1) {
          this.router.navigate("show", {show: state.shows[0].slug});
        } else {
          this.router.navigate("shows");
        }
      });
    };

    state.login(this.username, this.password, happyCb, sadCb);
  }
}
