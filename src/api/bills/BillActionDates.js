class ActionDates {
  constructor(json) {
    this.passed_upper = json.passed_upper;
    this.passed_lower = json.passed_lower;
    this.last = json.last;
    this.signed = json.signed;
    this.first = json.first;
  }
}

export default ActionDates;
