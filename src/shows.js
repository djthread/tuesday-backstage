import {inject} from "aurelia-framework";
import {State} from "./state";
// import {Router} from "aurelia-router";

@inject(State)
export class Shows {

  constructor(state, router) {
    this.state = state;
  }

  attached() {
    switch (this.state.shows.length) {
      case 0:
        this.state.bail();
        break;
      case 1:
        var sh = this.state.shows[0];
        this.router.navigateToRoute("show", {slug: sh.slug});
    }
  }

  configureRouter(config, router) {
    this.router = router;

    config.map([
      { route:    ["", "/"],
        name:     "list",
        title:    "Shows",
        moduleId: "./shows/list",
        nav:      false
      },
      { route:    "/:slug",
        name:     "show",
        moduleId: "./show",
        nav:      false
      }
    ]);
  }
}
