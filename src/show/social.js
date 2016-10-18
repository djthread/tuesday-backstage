import {HttpClient} from "aurelia-fetch-client";
import {Configure} from "aurelia-configuration";
import {inject} from "aurelia-framework";
import {State} from "../state";

@inject(State, Configure, HttpClient)
export class Social {

  constructor(state, config, http) {
    this.config = config;
    this.state = state;
    this.success = null;

    this.social = {
      fb_rtmp_uri: "",
      ip:          ""
    };

    http.configure(this.httpConfigurator);

    this.http = http;
  }

  activate() {
    return new Promise((accept, reject) => {
      console.log('hitting' + this.config.get('apiroot') + '/api/myip');
      this.http.fetch(this.config.get('apiroot') + '/api/myip')
      .then(response => response.json())
      .then(data => {
        this.social.ip = data.ip;
        accept();
      })
    }.bind(this));
  }

  submit() {
    this.success = null;

    this.state.push('stream_start', {
      url: this.social.fb_rtmp_url,
      ip:  this.social.ip
    }, (res) => {
      this.success = res.status === "ok";
    }.bind(this));
  }

  httpConfigurator(config) {
    config
      // .withDefaults({
      // credentials: 'same-origin' // Valid values; omit, same-origin and include
      // });
      // .withDefaults({
      // headers: {
      // 'Accept': 'application/json'
      // }
      // });

  }
}
