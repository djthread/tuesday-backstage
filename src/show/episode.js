import {inject, BindingEngine} from "aurelia-framework";
import {Router} from "aurelia-router";
import {State} from "../state";
import {Ep} from "../models/ep";

// @inject(State, Router)

@inject(State, Router, BindingEngine)
export class Episode {

  constructor(state, router, bindingEngine) {
    this.state   = state;
    this.router  = router;
    this.errors  = {};
    this.loading = false;
    this.tags    = null;
    this.tagsmsg = null;
    this.timeout = null;

    this.tagkeys = ["title", "artist", "album",
                    "genre", "recording_date", "time"];

    this.taglabels = {
      title:          "Title",
      artist:         "Artist",
      album:          "Album",
      genre:          "Genre",
      recording_date: "Rec. Date",
      time:           "Length"
    };

    this.bindingEngine = bindingEngine;

    // this.titleData = { name: 'title', prettyName: 'Title', maxLength: 50 };
    // this.authorData = { name: 'author', prettyName: 'Author', maxLength: 50 };
    // this.genreData = { name: 'genre', prettyName: 'Genre', maxLength: 50 };
    //
    // this.book = new Book();
    //
    // // This works for sending back up the chain but now I'm sending back the full bound object...
    // // What's the point in binding them if I do this???
    // // Only need binding down to the component, not back up to the parent
    // // Ugh! I'm too tired to think straight!
    // this.formValues = {
    //   title: '',
    //   author: '',
    //   genre: '',
    //   read: false
    // }


    // field :number, :integer
    // field :title, :string
    // field :record_date, Ecto.Date
    // field :filename, :string
    // field :description, :string
    //
    // belongs_to :user, Tuesday.User
    // belongs_to :show, Tuesday.Show
  }

  activate(params) {
    console.log('activate', params);

    if (params.num) {
      return new Promise((accept, reject) => {
        var episode = this.state.episodeByNum(params.num);
        console.log('episode', episode);
        if (!episode) return reject("Ep num ("+params.num+") doesn't exist!");
        this.ep = new Ep(episode);
        console.log('EPPP', this.ep);
        if (this.ep.filename) this.refreshTags();
        this.bindFilenameChange();
        accept();
      }.bind(this));
    } else {
      this.ep = new Ep({show_id: this.state.show.id});
      console.log('wattt', this.ep);
    }
  }

  submit() {
    var args  = {episode: this.ep},
        state = this.state;

    state.push("save_episode", args, () => {
      console.log("woop", arguments);
      state.getShow(state.show.id, () => {
        state.flashMsg("Episode saved!");
        this.router.navigateToRoute("episodes");
      });
    }.bind(this), (ret) => {
      this.errors = ret.errors;
      console.log('uhh', arguments);
      console.log('ERRORS', this.errors);
    }.bind(this));
  }

  refreshTags() {
    var args = {id: this.state.show.id, filename: this.ep.filename};
    console.log('ARGSSS', args);

    this.loading = true;
    this.state.push("read_tags", args, (tags) => {
      console.log('tags', tags);
      if (tags.msg) {
        this.tagsmsg = tags.msg;
        this.tags    = null;
      } else {
        this.tagsmsg = null;
        this.tags    = tags;
      }
      this.loading = false;
    }.bind(this));
  }

  bindFilenameChange() {
    this.bindingEngine.propertyObserver(this.ep, "filename").subscribe(this.fnChange.bind(this));
  }

  fnChange() {
    if (this.timeout) clearInterval(this.timeout);
    this.timeout = setTimeout(this.refreshTags.bind(this), 1000);
  }
}
//     }.bind(this), (a, b) => {
//       console.log('SAD FACE', arguments, a, b);
//       state.flashMsg("Sad face");
//     }.bind(this));
//   }
// }
