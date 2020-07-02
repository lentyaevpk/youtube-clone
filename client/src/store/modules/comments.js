import axios from "axios";

const state = {};

const getters = {};

const actions = {
  async saveComment(ctx, data) {
    let res = await axios.post(
      "http://localhost:5000/api/comment/saveComment",
      data
    );
    return res;
  },
  async getComments(ctx, data) {
    let res = await axios.post(
      "http://localhost:5000/api/comment/getComments",
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
