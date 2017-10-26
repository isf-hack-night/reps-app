import BillVoter from 'api/bills/BillVoter';

class BillVote {
  constructor(json) {
    this.pass_threshold = json['+threshold'];
    this.bill_id = json.bill_id;
    this.chamber = json.chamber;
    this.date = json.date;
    this.id = json.id;
    this.motion = json.motion;
    this.no_count = json.no_count;
    this.no_votes = json.no_votes.map(v => new BillVoter(v));
    this.other_count = json.other_count;
    this.other_votes = json.other_votes.map(v => new BillVoter(v));
    this.passed = json.passed;
    this.session = json.session;
    this.sources = json.sources;
    this.state = json.state;
    this.type = json.type;
    this.vote_id = json.vote_id;
    this.yes_count = json.yes_count;
    this.yes_votes = json.yes_votes.map(v => new BillVoter(v));
  }
}

export default BillVote;
