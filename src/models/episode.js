export class Episode {
  number = "";
  title = "";
  record_date = "";
  filename = "";
  description = "";

  constructor(data) {
    if (!!data) {
      this.setProperties(data);
    }
  }

  setProperties(data) {
    this.number      = data.number;
    this.title       = data.title;
    this.record_date = data.record_date;
    this.filename    = data.filename;
    this.description = data.description;
    this.id          = data._id;
  }
}
