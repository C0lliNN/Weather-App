/* eslint-disable no-param-reassign */
import { MutationTree } from "vuex";
import { Data, State } from "./types";

const mutations: MutationTree<State> = {
  startLoading(store) {
    store.isLoading = true;
  },
  setError(store, errorMessage: string) {
    store.error = errorMessage;
  },
  setData(store, data: Data) {
    store.data = data;
  },
  stopLoading(store) {
    store.isLoading = false;
  },
}

export default mutations;