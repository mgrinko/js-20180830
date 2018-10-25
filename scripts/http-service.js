const API_URL = 'https://mgrinko.github.io/js-20180830';
// const API_URL = 'http://localhost:3000'

const HttpService = {
  sendRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    let method = 'GET';

    xhr.open(method, `${API_URL}/api/${url}`, true);

    xhr.send();

    xhr.onload = () => {
      if (xhr.status !== 200) {
        console.log( xhr.status + ': ' + xhr.statusText );
      } else {
        let data = JSON.parse(xhr.responseText);

        callback(data);
      }
    };
  }
};

export default HttpService;
