import dva from '../lib/index';

const app = dva();
const defaultGlobalState = {
  isLogin: false
};

export const connect = app.connect;

export const globalState = {
  ...defaultGlobalState
};


export default app;

