import RenderAuthorized from '../components/Authorized';
import {globalState} from "../app";

let Authorized = RenderAuthorized(); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = function () {
  Authorized.authority = globalState.isLogin;
};

export { reloadAuthorized };
export default Authorized;
