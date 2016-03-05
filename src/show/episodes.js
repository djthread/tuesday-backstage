import {inject} from "aurelia-framework";
import {State} from "../state";
// import {Router} from "aurelia-router";

// @inject(State, Router)
@inject(State)
export class Episodes {

  constructor(state) {
    this.state = state;
  }

  // configureRouter(config, router) {
  //   this.router = router;
  //
  //   config.map([
  //     // {
  //     //   route:    "",
  //     //   name:     "uhm",
  //     //   title:    "K",
  //     //   moduleId: "./show/info",
  //     //   nav:      true
  //     // },
  //     {
  //       route:    ["","create"],
  //       name:     "createEpisode",
  //       title:    "Create Episode",
  //       moduleId: "./episode",
  //       nav:      true
  //     }
  //   ]);
  // }

  activate() {
    console.log('ACTIVATE>EEE');
    // console.log('show', );
    // return new Promise((accept, reject) => {
    //   this.state.getShow(() => {
    //     accept()
    //   });
    // }.bind(this));
  }
}
