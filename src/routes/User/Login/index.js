import {connect} from 'app';
import { message as Msg } from 'antd';

import UI from './UI';
import services from 'services/user';
import {reloadAuthorized} from 'utils/Authorized';
import {initBasicData, initGlobalEvent} from "../../../handler";

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
      // 初始化事件
      await initGlobalEvent();
      // 初始化数据
      await initBasicData({dispatch, getState});
      // 刷新 重新加载路由
      location.reload();
      // 更新准入权限 (更新后路由自动跳转)
      reloadAuthorized();
      
      Msg.destroy();
    }

  },
  onTabChange({dispatch, getState}) {

  },
  onChangeAutoLogin({dispatch, getState}) {

  }
})(UI);
