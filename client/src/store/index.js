import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import video from "./modules/video";
import subscribers from "./modules/subscribers";
import comments from "./modules/comments";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    video,
    subscribers,
    comments
  },
  state: {},
  mutations: {},
  actions: {}
});
