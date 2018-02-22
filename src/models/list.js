import { queryFakeList } from '../services/api';
import {globalState} from "../app";

const prefix = globalState.rawRouterData.reduce(function (ret, item) {
  if (item.component === 'tableList') {
    ret.push(item.path);
  }
  return ret;
}, []);

export default {
  namespace: 'list',
  prefix: prefix,
  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
