
class JSONRequest {
  constructor(path, params, errorHandler = null) {
    this.path = path;
    this.params = params;
    this.error = null;
    this.handleError = this.handleError.bind(this);
    this.errorHandler = errorHandler || this.handleError;
  }

  getParamString() {
    let paramString = '?';
    if (this.params) {
      const paramStrings = [];
      Object.entries(this.params).forEach(
        ([key, value]) =>
          paramStrings.push(`${key}=${value}`)
      );
      paramString = `${paramString}${paramStrings.join('&')}`;
    }
    return paramString;
  }

  getUrl() {
    return `${this.path}${this.getParamString()}`;
  }

  handleError(error) {
    console.log(error);
    this.error = error;
  }

  send() {
    return fetch(this.getUrl()).then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.')
      }
    ).catch((error) => this.errorHandler(error));
  }
}

export default JSONRequest;
