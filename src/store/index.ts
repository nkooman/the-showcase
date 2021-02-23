import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import { clickerGame } from './modules';
import { RootState } from './root-state';

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage
});

export default createStore<RootState>({
  strict: true,
  modules: {
    clickerGame
  },
  plugins: [vuexLocal.plugin]
});
