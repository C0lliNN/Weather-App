import { createStore } from 'vuex';
import unitModule from './unit';
import weatherModule from './weather';

export default createStore({
  modules: { unitModule, weatherModule },
});
