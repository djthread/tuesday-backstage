import {Socket, LongPoller} from "phoenix.js";
import {inject} from "aurelia-framework";
import {Configure} from "aurelia-configuration";
import {Router} from "aurelia-router";

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
    this.flash     = "";
  }

  // join(channel, args, happyCb) {
  //   var channel = this.socket.channel(channel, args);
  //   channel.join()
  //     .receive("ignore", () => console.log(channel + ": auth error"))
  //     .receive("ok",     happyCb)
  //     .receive("error",  () => console.log(channel + ": Connection interruption"));
  //   return channel;
  // }

  push(message, args, happyCb, sadCb) {
    var bail = this.bail;

    if (!sadCb) {
      sadCb = (reasons) => bail("Push ("+message+") fail:", reasons);
    }

    console.log('ok, pushing', message, args);
    if (!this.channel) return bail("Whoa no channel!");
    this.channel.push(message, args, 10000)
      .receive("ok", happyCb)
      .receive("error", sadCb)
      .receive("timeout", () => fail("Networking issue..."));
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

  setUser(user) {
    this.user = user;
  }

  setShows(shows) {
    this.shows = shows;
  }

  getShow(id, cb) {
    this.push("show", {id: id}, (info) => {
      if (!info) return this.bail("Bad tings");
      this.show = info.show;
      cb();
    }.bind(this));
  }

  // show() {
  //   var show = null;
  //   this.shows.forEach((s) => {
  //     if (this.showId === s.id) {
  //       show = s;
  //     }
  //   });
  //   return show;
  // }

  episodeByNum(num) {
    var ep = null;
    this.show.episodes.forEach((e) => {
      if (e.number == num) {
        ep = e;
      }
    }.bind(this));
    return ep;
  }

  idBySlug(slug) {
    var id = null;
    this.shows.forEach((show) => {
      if (show.slug === slug) {
        id = show.id;
      }
    }.bind(this));
    return id;
  }
  // navigatingToShowSlug(slug) {
  //   this.shows.forEach((show) => {
  //     if (show.slug === slug) {
  //       this.show = show;
  //     }
  //   }.bind(this));
  // }

  bail(msg, extra) {
    console.log("Bailing", msg, extra);
    this.router.navigate("login");
    if (msg) {
      this.flashMsg("Bailing: "+msg);
    }
  }

  flashMsg(msg) {
    this.flash = msg;
    setTimeout(() => {
      this.flash = "";
    }.bind(this), 5000);
  }
}
