import {connect} from 'app';
import { message as Msg } from 'antd';
import { routerRedux } from 'dva/router';

import UI from './UI';
import services from 'services/user';
import {reloadAuthorized} from 'utils/Authorized';
import {reloadLoginStatus, initBasicData} from "../../../handler";

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
      
      // 更新登录态
      await reloadLoginStatus();
      // 更新准入权限
      reloadAuthorized();
      // 初始化数据
      initBasicData({dispatch, getState})
      // 路由跳转
      dispatch(routerRedux.push('/'));
      
      Msg.destroy();
    }

  },
  onTabChange({dispatch, getState}) {

  },
  onChangeAutoLogin({dispatch, getState}) {

  }
})(UI);
