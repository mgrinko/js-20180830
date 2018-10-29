const API_URL = 'https://mgrinko.github.io/js-20180830';
// const API_URL = 'http://localhost:3000'

const HttpService = {
  async sendRequest(url) {
    let response = await fetch(`${API_URL}/api/${url}`)

    return response.json();
  }
};

export default HttpService;
