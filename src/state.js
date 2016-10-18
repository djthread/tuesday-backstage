import {Socket, LongPoller} from "phoenix.js";
import {inject} from "aurelia-framework";
import {Configure} from "aurelia-configuration";
import {Router} from "aurelia-router";

@inject(Configure, Router)
export class State {
  constructor(config, router) {
    this.router    = router;
    this.socketUri = config.get("apiroot") + "/socket";
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
      sadCb = (reasons) => {
        bail("Push ("+message+") fail:", reasons);
      };
    }

    console.log('ok, pushing', message, args);

    if (!this.channel) {  // nasty hack because it works
      console.log('DANG NO CHANNEL');
      this.router.navigateToRoute("login");
      window.location.reload();
    }

    this.channel.push(message, args, 10000)
      .receive("ok", happyCb.bind(this))
      .receive("error", sadCb.bind(this))
      .receive("timeout", () => {this.bail("Networking issue...");}.bind(this));
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
    var cb = () => {
      this.push("whoami", {}, (stuff) => {
        console.log("stuff", stuff);
        this.setShows(stuff.shows);
        this.setUser(stuff.user);
        happyCb();
      }.bind(this));
    }.bind(this);

    this.channel = this.socket.channel("admin", {name: name, pass: pass})

    this.channel.join().receive("ignore", sadCb.bind(this))
                       .receive("ok",     cb.bind(this))
                       .receive("error",  sadCb.bind(this));

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
    this.push("show", {id: id}, (show) => {
      // if (!info) return this.bail("Bad tings");
      this.show = show;
      console.log('GOT SHOW', show);
      cb();
    }.bind(this), () => {
      console.log('WATTT', arguments);
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

  episodeByNum(number) {
    var i, ep = null;
    for (i=0; i<this.show.episodes.length; i++) {
      if (this.show.episodes[i].number == number) {
        ep = this.show.episodes[i];
        break;
      }
    };
    return ep;
  }

  eventById(id) {
    var i, ev = null;
    for (i=0; i<this.show.events.length; i++) {
      if (this.show.events[i].id == id) {
        ev = this.show.events[i];
        break;
      }
    };
    return ev;
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
    this.router.navigateToRoute("login");
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
