import {inject} from "aurelia-framework";
import {State} from "../state";
import {Router} from "aurelia-router";

@inject(State, Router)
export class Episodes {

  constructor(state, router) {
    this.state    = state;
    this.router   = router;
    this.episodes = [];
  }

  configureRouter(config, router) {
    this.router = router;

    config.map([
      { route:    ["", "/"],
        name:     "episodes",
        title:    "Podcast Episodes",
        moduleId: "./list",
        nav:      true
      },
      // { route:    ["","create"],
      //   name:     "createEpisode",
      //   title:    "Create Episode",
      //   moduleId: "./episode",
      //   nav:      true
      // },
      { route:    "/:num",
        name:     "episode",
        title:    "Episode",
        moduleId: "./episode",
        nav:      false
      }
    ]);
  }
}
