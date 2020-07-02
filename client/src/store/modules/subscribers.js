import axios from "axios";

const state = {};

const getters = {};

const actions = {
  async getSubs(ctx, data) {
    let res = await axios.post(
      "http://localhost:5000/api/subscribers/getSubscribers",
      data
    );
    return res;
  },
  async subscribe(ctx, data) {
    let res = await axios.post(
      "http://localhost:5000/api/subscribers/subscribe",
      data
    );
    return res;
  },
  async unsubscribe(ctx, data) {
    let res = await axios.post(
      "http://localhost:5000/api/subscribers/unsubscribe",
      data
    );
    return res;
  }
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};
