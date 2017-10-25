class BillAction {
  constructor(json) {
    this.action = json.action;
    this.actor = json.actor;
    this.date = json.date;
    this.type = json.type;
  }
}

export default BillAction;
