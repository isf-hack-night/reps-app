class BillVersion {
  constructor(json) {
    this.doc_id = json.doc_id;
    this.mimetype = json.mimetype;
    this.name = json.name;
    this.url = json.url;
  }
}

export default BillVersion;
