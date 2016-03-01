import {Socket, LongPoller} from "phoenix.js";
import {inject} from "aurelia-framework";
import {Configure} from "aurelia-configuration";

@inject(Configure)
export class State {
  constructor(config) {
    this.socketUri = config.get("socket.endpoint");
    this.shows     = [];
    this.user      = null;
    this.socket    = null;
    this.channel   = null;
    this.socket    = this.startSocket();
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
}
