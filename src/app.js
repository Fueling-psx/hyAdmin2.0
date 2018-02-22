import dva from '../lib/index';

const app = dva();
const initGlobalState = {
  isLogin: false,
  rawRouterData: []
};

export const connect = app.connect;

export const globalState = {
  ...initGlobalState
};


export default app;

