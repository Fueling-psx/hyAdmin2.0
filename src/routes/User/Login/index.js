import {connect} from 'app';
import { message as Msg } from 'antd';
import { routerRedux } from 'dva/router';

import UI from './UI';
import services from './services';
import login from "../../../models/login";

export default connect(({login})=> {

  return {
    ...login
  };
}, {
  async onLoginSubmit({changeModel, dispatch, getState}, err, {userName, password}) {
    if (err) {
      return;
    }
    changeModel('login', {submitting: true});

    const loginModel = getState().login;
    const type = loginModel.type;
    const {status, message} = await services.login({type, userName, password});

    changeModel('login', {
      [type]: {...loginModel[type], status, message},
      submitting: false
    });

    if (status === 'error') {
      return;
    }

    if (status === 'ok') {
      Msg.loading(message);

      const {menuData, currentUser} = await services.getUserInfo();

      changeModel('user', {currentUser});
      changeModel('menu', {menuData});
      //
      Msg.destroy();
      dispatch(routerRedux.push('/'));

    }

  },
  onTabChange({dispatch, getState}) {

  },
  onChangeAutoLogin({dispatch, getState}) {

  }
})(UI);
