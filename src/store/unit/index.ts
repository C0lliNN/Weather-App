/* eslint-disable no-param-reassign */
import { Module } from 'vuex';

type Unit = 'C' | 'T';

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
    getCurrentUnit(store): Unit {
      return store.currentUnit;
    },
  },
};

export default unitModule;
