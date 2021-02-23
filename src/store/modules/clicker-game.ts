import { Module } from 'vuex';
import { RootState } from '@/store/root-state';

export interface ClickerGameState {
  currency: number;
}

export const clickerGame: Module<ClickerGameState, RootState> = {
  namespaced: true,
  state: () => ({
    currency: 0,
    clickers: []
  }),
  mutations: {
    ADD_CURRENCY(state, payload) {
      state.currency += payload;
    },
    SET_CURRENCY(state, payload) {
      state.currency = payload;
    },
    REMOVE_CURRENCY(state, payload) {
      state.currency -= payload;
    }
  },
  actions: {
    addCurrency(context, payload) {
      context.commit('ADD_CURRENCY', Math.abs(payload));
    },
    setCurrency(context, payload) {
      context.commit('SET_CURRENCY', payload);
    },
    removeCurrency(context, payload) {
      context.commit('REMOVE_CURRENCY', Math.abs(payload));
    },
    resetGame(context) {
      context.commit('SET_CURRENCY', 0);
    }
  }
};
