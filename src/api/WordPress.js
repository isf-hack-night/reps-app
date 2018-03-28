import JSONRequest from 'api/JSONRequest';
import WPAPI from 'wpapi';

class WordPress {
  constructor(url='https://dev.state-strong.org') {
    this.apiPromise = WPAPI.discover(url);
  }

  fetchLegislation(slug) {
    return apiPromise.slug(slug)
  }

  fetchPost(id, type) {
    const request = new JSONRequest(`${this.getPathUrl(type)}/${id}`);
    return request.send();
  }

  searchPosts(queryParams, type) {
    const request = new JSONRequest(`${this.getPathUrl(type)}`, queryParams);
    return request.send();
  }
}

export default WordPress;
