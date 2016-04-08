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
    this.password = "dontforget99";
    // this.password = "";
  }

  login() {
    var state = this.state,
        sadCb = () => state.flashMsg("Nope.");

    this.username = this.username.trim();
    this.password = this.password.trim();

    Cookie.set("username", this.username);

    var happyCb = () => {
      state.push("whoami", {}, (stuff) => {
        state.setShows(stuff.shows);
        state.setUser(stuff.user);
        this.router.navigateToRoute("shows");
        // if (state.shows.length === 1) {
        //   state.shows  = state.shows;
        //   state.showId = state.shows[0].id;
        //   this.router.navigateToRoute("show", {show: state.shows[0].slug});
        // } else {
        //   this.router.navigateToRoute("shows");
        // }
      });
    };

    state.login(this.username, this.password, happyCb, sadCb);
  }
}
