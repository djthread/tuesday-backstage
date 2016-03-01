export class App {

  configureRouter(config, router) {
    this.router = router;

    config.map([
      { route:    ["", "login"], title: "Login",     name: "login",
        moduleId: "./login",     nav:   true
      },
      { route:    "shows",       title: "Shows",     name: "shows",
        moduleId: "./shows",     nav: true
      },
      { route:    "show/:show",  title: "Show",      name: "show",
        moduleId: "./show",      nav: true,          href: ""
      },
    ]);
  }
}
