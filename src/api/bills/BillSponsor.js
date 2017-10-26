class BillSponsor {
  constructor(json) {
    this.leg_id = json.leg_id;
    this.name = json.name;
    this.type = json.type;
  }
}

export default BillSponsor;
