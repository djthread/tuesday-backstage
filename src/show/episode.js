import {inject} from "aurelia-framework";
import {State} from "../state";

@inject(State)
export class Episode {

  constructor(state) {
    console.log('WHAHIE Episode');
    this.state   = state;
    this.episode = {};

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
}
