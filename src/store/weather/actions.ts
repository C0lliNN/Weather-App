import { ActionTree } from 'vuex';
import Swal from 'sweetalert2';
import api from '@/services/api';
import { Data, State } from './types';
import getTransformedData from './utility';

const actions: ActionTree<State, {}> = {
  async getWeatherFromWoeid(context, locationId: number) {
    context.commit('startLoading');
    try {
      const { data } = await api.get(`/location/${locationId}`);

      const transformedData: Data = getTransformedData(data);

      context.commit('setData', transformedData);
    } catch (error) {
      context.commit('setError', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `It was not possible to get the data: ${error.message}`,
      });
    } finally {
      context.commit('stopLoading');
    }
  },

  async getLocationBasedOnCoordinates(context, payload) {
    context.commit('startLoading');
    try {
      const { latitude, longitude } = payload;

      const { data: locations } = await api.get('location/search', {
        params: {
          lattlong: `${latitude},${longitude}`,
        },
      });

      const closestLocation = locations.shift();

      await this.dispatch('getWeatherFromWoeid', closestLocation.woeid);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `It was not possible to get your location: ${error.message}`,
        icon: 'error',
      });
    }
  },
};

export default actions;
