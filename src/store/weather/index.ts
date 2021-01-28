/* eslint-disable no-param-reassign */
import { Module } from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';
import { State } from './types';

const weatherModule: Module<State, {}> = {
  state,
  mutations,
  actions,
  getters,
};

export default weatherModule;
