/* eslint-disable no-param-reassign */
import { Module } from 'vuex';
import { Unit } from './types';

interface State {
  currentUnit: Unit;
}

const unitModule: Module<State, {}> = {
  state: {
    currentUnit: 'C',
  },
  mutations: {
    changeUnit(store, newUnit: Unit) {
      store.currentUnit = newUnit;
    },
  },
  actions: {
    changeUnit(context, newUnit: Unit) {
      context.commit('changeUnit', newUnit);
    },
  },
  getters: {
    unit(store): Unit {
      return store.currentUnit;
    },
  },
};

export default unitModule;
