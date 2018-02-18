import ajax from 'utils/ajax';

const services = {}


services.login = function(params = {}) {
  const path = '/System/login/index';
  return ajax.post(path, params);
}


services.getUserInfo = function (params = {}) {
  const path = '/System/index/index';

  return ajax.post(path, params);
}

export default services;
