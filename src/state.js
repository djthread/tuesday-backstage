import {Socket, LongPoller} from "phoenix.js";
import {inject} from "aurelia-framework";
import {Configure} from "aurelia-configuration";
import {Router} from "aurelia-router";

// @inject(State, Router)

@inject(Configure, Router)
export class State {
  constructor(config, router) {
    this.router    = router
    this.socketUri = config.get("socket.endpoint");
    this.user      = null;
    this.socket    = null;
    this.channel   = null;
    this.socket    = this.startSocket();
    this.shows     = [];
    this.showId    = null;
  }

  // join(channel, args, happyCb) {
  //   var channel = this.socket.channel(channel, args);
  //   channel.join()
  //     .receive("ignore", () => console.log(channel + ": auth error"))
  //     .receive("ok",     happyCb)
  //     .receive("error",  () => console.log(channel + ": Connection interruption"));
  //   return channel;
  // }

  push(message, args, happyCb) {
    console.log('okkkkkkkkkkkk', args, this.channel);
    if (!this.channel) return this.bail("Whoa no channel!");
    this.channel.push(message, args, 10000)
      .receive("ok", happyCb)
      .receive("error", (reasons) => console.log("Show list failed:", reasons))
      .receive("timeout", () => console.log("Networking issue..."));
  }

  startSocket() {
    var socket = new Socket(this.socketUri, {
      logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) })
    });

    this.socket = socket;

    socket.connect();

    socket.onOpen(ev => {
      console.log("OPEN", ev)
    }.bind(this));

    socket.onError(ev => console.log("ERROR", ev));
    socket.onClose(e => console.log("CLOSE", e));

    return socket;
  }

  login(name, pass, happyCb, sadCb) {
    this.channel = this.socket.channel("admin", {name: name, pass: pass})

    this.channel.join().receive("ignore", sadCb)
                       .receive("ok",     happyCb)
                       .receive("error",  sadCb);

    this.channel.onError(e => console.log("something went wrong", e));
    this.channel.onClose(e => console.log("channel closed", e));
  }

  getShow(cb) {
    this.push("show", {id: this.showId}, (info) => {
      if (!info) return this.bail("Bad tings");
      this.episodes = info.episodes;
      cb();
    });
  }

  show() {
    this.shows.forEach((show) => {
      if (this.showId === show.id) {
        return show;
      }
    });
    return null;
 }

  navigatingToShowSlug(slug) {
    this.shows.forEach((show) => {
      if (show.slug === slug) {
        this.showId = show.id;
      }
    });
  }

  startOver() {
    this.socket.disconnect();
    this.router.navigate("login");
  }

  bail() {
    console.log('right.');
    this.router.navigate("login");
  }
}
