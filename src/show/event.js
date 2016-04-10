import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {State} from "../state";
import {Ev} from "../models/ev";

// @inject(State, Router)

@inject(State, Router)
export class Episode {

  constructor(state, router) {
    this.state  = state;
    this.router = router;
    this.errors = {};

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
    if (params.id) {
      return new Promise((accept, reject) => {
        var event = this.state.eventById(params.id);
        if (!event) {
          return reject("Ep num ("+params.id+") doesn't exist!");
        }
        this.ev = new Ev(event);
        this.ev.addEmptyLine();
        accept();
      }.bind(this));
    } else {
      this.ev = new Ev(this.state.show.id);
    }
  }

  addBlank(idx, event) {
    if (!this.ev.lastLineIsCompletelyEmpty()) {
      this.ev.addEmptyLine();
    }
  }

  removeItem(idx) {
    this.ev.info.lines.splice(idx, 1);
  }

  submit() {
    var args  = {event: this.ev.json()},
        state = this.state;

    console.log("SAVING, BIDGES:", args);

    state.push("save_event", args, () => {
      console.log("woop", arguments);
      state.getShow(state.show.id, () => {
        state.flashMsg("Episode saved!");
        this.router.navigateToRoute("events");
      });
    }.bind(this), (ret) => {
      this.errors = ret.errors;
      console.log('uhh', arguments);
      console.log('ERRORS', this.errors);
    }.bind(this));
  }
}
//     }.bind(this), (a, b) => {
//       console.log('SAD FACE', arguments, a, b);
//       state.flashMsg("Sad face");
//     }.bind(this));
//   }
// }
