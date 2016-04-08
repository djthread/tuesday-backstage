export class Ep {
  number = "";
  title = "";
  record_date = "";
  filename = "";
  description = "";
  show_id = null;

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
    this.show_id     = data.show_id;
    this.id          = data.id;
  }
}
