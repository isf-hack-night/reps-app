import WPAPI from 'wpapi';
import utils from 'utils';

class WordPress {
  constructor(url='/') {
    this.apiPromise = WPAPI.discover(url);
    this.billMetadata = {
      position: null,
      interest: null,
      issue: null,
      bill_status: null,
    };
    this.metadataLoaded = false
  }

  fetchMetadata() {
    // Returns a promise with the metadata
    if (this.metadataLoaded === true) {
      return Promise.resolve(this.billMetadata);
    }
    const promises = Object.keys(this.billMetadata).map(key =>
      this.apiPromise.then(
        api => api[key]().get()
      ).then(
        metadataList => this.billMetadata[key] = utils.arrayToObject('id', metadataList)
      )
    );
    return Promise.all(promises).then(
      () => {
        this.metadataLoaded = true;
        return this.billMetadata;
      }
    );
  }

  annotateBillMetadata(bill) {
    return this.fetchMetadata().then(
      metadata => {
        Object.keys(metadata).forEach(key => {
          bill[key] = bill[key].map(id => metadata[key][id])
        });
        return bill;
      }
    );
  }
}

export default WordPress;
