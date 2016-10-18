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
        title:    "Episodes",
        moduleId: "./show/episodes",
        nav:      true
      },
      { route:    "events",
        name:     "events",
        title:    "Events",
        moduleId: "./show/events",
        nav:      true
      },
      { route:    "info",
        name:     "info",
        title:    "Info",
        moduleId: "./show/info",
        nav:      true
      },
      { route:    "stream",
        name:     "stream",
        title:    "Stream",
        moduleId: "./show/stream",
        nav:      true
      },
      { route:    "help",
        name:     "help",
        title:    "Help",
        moduleId: "./show/help",
        nav:      true
      },
      { route:    "episode/:num",
        name:     "episode",
        title:    "Edit Episode",
        moduleId: "./show/episode",
        nav:      false
      },
      { route:    "event/:id",
        name:     "event",
        title:    "Edit Event",
        moduleId: "./show/event",
        nav:      false
      },
      { route:    "create-episode",
        name:     "createEpisode",
        title:    "Create Episode",
        moduleId: "./show/episode",
        nav:      false
      },
      { route:    "create-event",
        name:     "createEvent",
        title:    "Create Event",
        moduleId: "./show/event",
        nav:      false
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
