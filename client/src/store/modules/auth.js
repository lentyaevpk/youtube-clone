import axios from "axios";
import router from "../../router/index";

const state = {
  token: localStorage.getItem("token") || "",
  user: {},
  status: ""
};

const getters = {
  isLoggedIn: state => !!state.token,
  authState: state => state.status,
  user: state => state.user
};

const actions = {
  // login action
  async login({ commit }, user) {
    commit("auth_request");
    let res = await axios.post("http://localhost:5000/api/users/login", user);
    if (res.data.success) {
      const token = res.data.token;
      const user = res.data.user;
      const payload = {
        token,
        user
      };
      // put token into the localStorage
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      commit("auth_success", payload);
    }
    return res;
  },

  async register({ commit }, userData) {
    commit("register_request");
    let res = await axios.post(
      "http://localhost:5000/api/users/register",
      userData
    );
    if (res.data.success != undefined) {
      commit("register_success");
    }
    return res;
  },

  async getProfile({ commit }) {
    commit("profile_request");
    let res = await axios.get("http://localhost:5000/api/users/profile");
    commit("user_profile", res.data.user);
    return res;
  },

  async logout({ commit }) {
    await localStorage.removeItem("token");
    commit("logout");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/login");
    return;
  }
};

const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, payload) {
    state.token = payload.token;
    state.user = payload.user;
    state.status = "success";
  },
  register_request(state) {
    state.status = "loading";
  },
  register_success(state) {
    state.status = "success";
  },
  logout(state) {
    (state.status = ""), (state.token = ""), (state.user = "");
  },
  profile_request(state) {
    state.status = "loading";
  },
  user_profile(state, user) {
    state.user = user;
    state.status = "success";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
