import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {State} from "../state";
import {Ep} from "../models/ep";

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
    if (params.num) {
      return new Promise((accept, reject) => {
        var episode = this.state.episodeByNum(params.num);
        if (!episode) return reject("Ep num ("+params.num+") doesn't exist!");
        this.ep = new Ep(episode);
        console.log('EPPP', this.ep);
        accept();
      }.bind(this));
    } else {
      this.ep = new Ep({show_id: this.state.show.id});
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
}
//     }.bind(this), (a, b) => {
//       console.log('SAD FACE', arguments, a, b);
//       state.flashMsg("Sad face");
//     }.bind(this));
//   }
// }
