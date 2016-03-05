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
      { route:    ["", "login"], title: "Login",     name: "login",
        moduleId: "./login",     nav:   false
      },
      { route:    "shows",       title: "Shows",     name: "shows",
        moduleId: "./shows",     nav: false
      },
      { route:    "show/:show",  title: "Show",      name: "show",
        moduleId: "./show",      nav: false,         href: ""
      },
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
