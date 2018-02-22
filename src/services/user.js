import ajax from 'utils/ajax';


const services = {};


services.login = function(params = {}) {
  const path = '/System/account/login';
  return ajax.post(path, params);
};

services.logout = function (params = {}) {
  const path = '/System/account/logout';
  
  return ajax.post(path, params);
};

services.getUserInfo = function (params = {}) {
  const path = '/System/user/getUserInfo';
  
  return ajax.post(path, params);
};

services.checkAuthority = function (params = {}) {
  const path = '/System/user/checkAuth';
  
  return ajax.post(path, params);
};

services.getRouteData = function (params = {}) {
  const path = 'System/user/routerData';
  
  return ajax.post(path, params);
};

export default services;
