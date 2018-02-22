import services from 'services/user';
import {globalState} from "./app";

export async function  reloadLoginStatus() {
  const {status} = await services.checkAuthority();
  
  globalState.isLogin = status;
  
  return status;
}

export async function initRouterData() {
  const {data} = await services.getRouteData();
  globalState.rawRouterData = data;
}

export async function initGlobalEvent() {
  const isLogin = await reloadLoginStatus();
  isLogin && await initRouterData();
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
