import {State} from "./state";
import {inject} from "aurelia-framework";

@inject(State)
export class App {

  constructor(state) {
    this.state = state;
  }

  configureRouter(config, router) {
    this.router = router;

    config.map([
      { route:    ["", "/", "login"],
        title:    "Login",
        moduleId: "./login",
        nav:      false,
        name:     "login"
      },
      { route:    "shows",
        title:    "Shows",
        moduleId: "./shows",
        nav:      false,
        name:     "shows"
      }
    ]);
  }

  showState() {
    console.log(this.state);
  }

  // activate() {
  //   return new Promise((accept, reject) => {
  //     this.state.startup(() => {
  //       accept()
  //     });
  //   }.bind(this));
  // }
}
