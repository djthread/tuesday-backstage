export class Ev {
  title = "";
  happens_on = "";
  description = "";
  info = this.defaultPerformances();
  show_id = null;

  constructor(data) {
    if (typeof data == 'object') { // if (!!data) {
      this.setProperties(data);
    } else if (Number.isInteger(data)) {
      this.setProperties({
        show_id: data,
        performances: this.defaultPerformances()
      });
    }
  }

  setProperties(data) {
    this.title       = data.title;
    this.happens_on  = data.happens_on;
    this.description = data.description;
    this.show_id     = data.show_id;
    this.id          = data.id;
    this.lines       = data.performances;

    if (!this.info) {
      this.lines = {};
    }

    if (!this.info.lines) {
      this.lines = [];
    }

    if (data.info_json) {
      this.info = JSON.parse(data.info_json);
    }
  }

  addEmptyLine() {
    this.lines.push(this.emptyPerformance());
  }

  defaultPerformances() {
    return {
      lines: [ this.emptyPerformance() ]
    };
  }

  emptyPerformance() {
    return {
      time:         "",
      artist:       "",
      genres:       "",
      affiliations: "",
      extra:        ""
    };
  }

  lastLineIsCompletelyEmpty() {
    var lines = this.lines,
        last  = lines[lines.length - 1];

    return this.isEmpty(last);
  }

  isEmpty(line) {
    return !line.time         &&
           !line.artist       &&
           !line.genres       &&
           !line.affiliations &&
           !line.extra;
  }

  json() {
    return {
      id:          this.id,
      title:       this.title,
      happens_on:  this.happens_on,
      description: this.description,
      show_id:     this.show_id,
      info_json:   JSON.stringify({
        lines: this.lines.filter((line) => {
          return !this.isEmpty(line);
        }.bind(this))
      })
    };
  }
}
