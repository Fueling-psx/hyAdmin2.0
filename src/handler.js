import services from 'services/user';
import {globalState} from "./app";

export async function  reloadLoginStatus() {
  const {status} = await services.checkAuthority();
  
  globalState.isLogin = status;
}

export async function initGlobalEvent() {
  await reloadLoginStatus()
}

export async function initBasicData({dispatch, getState}) {
  const {menuData, currentUser} = await services.getUserInfo();

  dispatch({
    type: 'user/saveCurrentUser',
    payload: currentUser
  });
  dispatch({
    type: 'menu/changeMenuData',
    payload: menuData
  });
}
