import {inject} from "aurelia-framework";
import {State} from "./state";

@inject(State)
export class Show {

  constructor(state) {
    this.state = state;
  }

  configureRouter(config, router) {
    this.router = router;

    config.map([
      { route:    ["", "/"],
        name:     "episodes",
        title:    "Podcast Episodes",
        moduleId: "./show/episodes",
        nav:      true
      },
      { route:    "episode/:num",
        name:     "episode",
        title:    "Edit Episode",
        moduleId: "./show/episode",
        nav:      false
      },
      { route:    "create-episode",
        name:     "createEpisode",
        title:    "Create Episode",
        moduleId: "./show/episode",
        nav:      false
      },
      { route:    "info",
        name:     "info",
        title:    "Info",
        moduleId: "./show/info",
        nav:      true
      }
    ]);
  }

  activate(params) {
    // this.state.navigatingToShowSlug(params.slug);

    var id = this.state.idBySlug(params.slug);

    return new Promise((accept, reject) => {
      this.state.getShow(id, () => {
        accept()
      });
    }.bind(this));
  }
}
