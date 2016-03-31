import {inject} from "aurelia-framework";
import {State} from "../state";
import {Ep} from "../models/ep";

@inject(State)
export class Episode {

  constructor(state) {
    this.state = state;

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
        accept();
      }.bind(this));
    } else {
      this.ep = new Ep({show_id: this.state.show.id});
    }
  }

  submit() {
    var args = {episode: this.ep};

    this.state.push("save_episode", args, () => {
      alert('woop');
      console.log(arguments);
    });
  }
}
