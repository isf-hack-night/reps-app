import BillActionDates from 'api/bills/BillActionDates';
import BillAction from 'api/bills/BillAction';
import BillSponsor from 'api/bills/BillSponsor';
import BillVersion from 'api/bills/BillVersion';
import BillVote from 'api/bills/BillVote';

class BillDetail {
  constructor(json) {
    this.action_dates = new BillActionDates(json.action_dates);
    this.actions = json.actions.map(a => new BillAction(a));
    this.alternate_titles = json.alternate_titles;
    this.bill_id = json.bill_id;
    this.chamber = json.chamber;
    this.created_at = json.created_at;
    this.documents = json.documents;
    this.id = json.id;
    this.level = json.level;
    this.scraped_subjects = json.scraped_subjects;
    this.session = json.session;
    this.sources = json.sources;
    this.sponsors = json.sponsors.map(s => new BillSponsor(s));
    this.state = json.state;
    this.subjects = json.subjects;
    this.title = json.title;
    this.type = json.type;
    this.updated_at = json.updated_at;
    this.versions = json.versions.map(v => new BillVersion(v));
    this.votes = json.votes.map(v => new BillVote(v));
  }
}
