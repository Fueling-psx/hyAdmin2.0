import '@babel/polyfill';
import 'url-polyfill';
import 'moment/locale/zh-cn';
import './index.less';
import './rollbar';

import FastClick from 'fastclick';
import app, {globalState} from './app';
import {initGlobalEvent, initBasicData} from './handler';

// 1. exec global event
initGlobalEvent().then(function () {
  
  // 2. Register global model
  app.model(require('./models/global').default);

  // 3. Router
  app.router(require('./router').default);

  // 4. Start
  app.start('#root');
  
  if (globalState.isLogin) {
    initBasicData(app._store);
  }
  
  
  FastClick.attach(document.body);
});
