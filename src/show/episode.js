import {inject} from "aurelia-framework";
import {State} from "../state";
import {Ep} from "../models/ep";

@inject(State)
export class Episode {

  constructor(state) {
    this.state = state;
    this.ep    = new Ep();

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
    console.log("PARAMS", params);
    if (params.id === "create") return;

    return new Promise((accept, reject) => {
      this.state.getShow(() => {
        accept()
      });
    }.bind(this));
  }

  submit() {
    var args = {
      episode: this.ep,
      show_id: this.state.showId
    };

    this.state.push("save_episode", args, () => {
      alert('woop');
    });
  }
}
