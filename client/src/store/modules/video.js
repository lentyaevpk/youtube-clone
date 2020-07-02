import axios from "axios";

const state = {};

const getters = {};

const actions = {
  async uploadFiles(ctx, formData, config) {
    let res = await axios.post(
      "http://localhost:5000/api/video/uploadfiles",
      formData,
      config
    );
    return res;
  },
  async uploadVideo(ctx, data) {
    let res = await axios.post(
      "http://localhost:5000/api/video/uploadVideo",
      data
    );
    return res;
  },
  async getVideos() {
    let res = await axios.get("http://localhost:5000/api/video/getVideos");
    return res;
  },
  async getVideo(ctx, data) {
    let res = await axios.post(
      "http://localhost:5000/api/video/getVideo",
      data
    );
    return res;
  },
  async getLikedVideos(ctx, data) {
    let res = await axios.post(
      "http://localhost:5000/api/video/getLikedVideos",
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
