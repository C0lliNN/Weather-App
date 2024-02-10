import { ActionTree } from 'vuex';
import Swal from 'sweetalert2';
import api from '@/services/api';
import { Data, Place, State } from './types';
import getTransformedData from './utility';

const actions: ActionTree<State, {}> = {
  async getWeatherByPlace(context, place: Place) {
    context.commit('startLoading');
    try {
      const { data } = await api.get('daily', {
        params: {
          'place_id': place.placeId,
          language: 'en',
          units: 'us'
        }
      });

      data.place = place
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

  async getPlaceBasedOnCoordinates(context, payload) {
    context.commit('startLoading');
    try {
      const { latitude, longitude } = payload;

      const data = await api.get(`/nearest_place`, {
        params: {
          lat: String(latitude),
          lon: String(longitude),
          language: 'en',
        }
      });

      const place: Place = {
        placeId : data.data.place_id,
        name: data.data.name,
      }

      await this.dispatch('getWeatherByPlace', place);
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
