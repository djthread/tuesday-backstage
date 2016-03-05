import {inject} from "aurelia-framework";
import {State} from "./state";

@inject(State)
export class Show {

  constructor(state) {
    this.state             = state;
    this.createEpisodeHref = null;
  }

  configureRouter(config, router) {
    this.router = router;

    config.map([
      {
        route:    ["", "episodes"],
        name:     "episodes",
        title:    "Podcast Episodes",
        moduleId: "./show/episodes",
        nav:      true
      },
      {
        route:    "info",
        name:     "info",
        title:    "Info",
        moduleId: "./show/info",
        nav:      true
      },
      {
        route:    "episodes/create",
        name:     "createEpisode",
        title:    "Create Episode",
        moduleId: "./show/episode"
      }
    ]);
  }

  activate(params, navigationInstruction) {
    this.state.navigatingToShowSlug(navigationInstruction.name);

    this.createEpisodeRoute = this.router.generate("createEpisode");
  }
}
