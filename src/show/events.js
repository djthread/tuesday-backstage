import {State} from "../state";
import {inject} from "aurelia-framework";

@inject(State)
export class List {

  constructor(state) {
    this.state = state;
  }

  activate() {
    console.log('ACTIVATE>EEE');

    // return new Promise((accept, reject) => {
    //   console.log('going....', this.state.show);
    //   this.state.push(
    //     "show", {id: this.state.show.id},
    //     (result) => {
    //       console.log('SHOWWWW', result);
    //       this.episodes = result.show.episodes;
    //       console.log('done!', this.episodes);
    //       accept();
    //     }
    //   );
    // }.bind(this));
  }
}

/*
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

  // configureRouter(config, router) {
  //   this.router = router;
  //
  //   config.map([
  //     { route:    ["", "/"],
  //       name:     "episodes",
  //       title:    "Podcast Episodes",
  //       moduleId: "./list",
  //       nav:      true
  //     },
  //     // { route:    ["","create"],
  //     //   name:     "createEpisode",
  //     //   title:    "Create Episode",
  //     //   moduleId: "./episode",
  //     //   nav:      true
  //     // },
  //     { route:    "/:num",
  //       name:     "episode",
  //       title:    "Episode",
  //       moduleId: "./episode",
  //       nav:      false
  //     }
  //   ]);
  // }
}
*/
