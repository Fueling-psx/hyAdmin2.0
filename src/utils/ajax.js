import request from './request';

const ajax = {};

ajax.post = function(url, body) {
  const options = {
    method: 'POST',
    headers: new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'x-requested-with'
    }),
    mode: 'cors',
    body
  }

  return request(url, options)
}

export default ajax;
