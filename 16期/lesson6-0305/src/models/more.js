import { getChannelData, getChannelDataBySearch } from '@/services/more.js';

const model = {
  namespace: 'more',
  state: {
    data: [],
  },
  effects: {
    *getChannelData({ payload }, { call, put }) {
      const response = yield call(getChannelData, payload);
      yield put({
        type: 'channelData',
        payload: response,
      });
    },
    *getChannelDataBySearch({ payload }, { call, put }) {
      const response = yield call(getChannelDataBySearch, payload);
      console.log('has', response, payload);

      yield put({
        type: 'channelData',
        payload: response,
      });
    },
  },
  reducers: {
    channelData(state, { payload }) {
      return { ...state, data: [...payload.data] };
    },
  },
};

export default model;
