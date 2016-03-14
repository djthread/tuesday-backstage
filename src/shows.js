import {inject} from "aurelia-framework";
import {State} from "./state";
// import {Router} from "aurelia-router";

// @inject(State, Router)
@inject(State)
export class Shows {

  // constructor(state, router) {
  //   this.state  = state;
  //   this.router = router;
  constructor(state) {
    this.state = state;

    if (this.state.shows.length === 0) {
      alert("You has no shows");
      this.state.bail();
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


    //   { route:    "show/:show",  title: "Show",
    //     moduleId: "./show",      nav: false,
    //     href:     "",
    //     name: "show"
    // }].concat(this.state.shows.map((show) => {
    //   return {
    //     route:    show.slug,
    //     name:     show.slug,
    //     title:    show.name,
    //     moduleId: "./show",
    //     nav:      true
    //   };
    // })));
}
