import { ActionTree } from 'vuex';
import api from '@/services/api';
import { Data, State } from './types';
import getTransformedData from './utility';

const actions: ActionTree<State, {}> = {
  async getData(context, locationId: number) {
    context.commit('startLoading');
    try {
      const { data } = await api.get(`/location/${locationId}`);

      const transformedData: Data = getTransformedData(data);

      context.commit('setData', transformedData);
    } catch (error) {
      context.commit('setError', error.message);
    }
  },
};

export default actions;
