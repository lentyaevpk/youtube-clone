import axios from 'axios'

export default {
  data() {
    return {
      likes: [],
      dislikes: []
    };
  },
  computed: {
    isLikedByUser() {
      return this.likes.some(like => like.userId === this.user._id);
    },
    isDislikedByUser() {
      return this.dislikes.some(dislike => dislike.userId === this.user._id);
    }
  },
  methods: {
    getLikes(data) {
      axios
        .post("http://localhost:5000/api/like/getLikes", data)
        .then(res => {
          if (res.data.success) {
            this.likes = res.data.likes;
          } else {
            console.log("failed to get likes");
          }
        });
    },
    getDislikes(data) {
      axios
        .post("http://localhost:5000/api/like/getDislikes", data)
        .then(res => {
          if (res.data.success) {
            this.dislikes = res.data.dislikes;
          } else {
            console.log("failed to get dislikes");
          }
        });
    },
    like(data) {
      if (this.isLoggedIn) {
        axios
          .post(
            `http://localhost:5000/api/like/${
              this.isLikedByUser ? "un" : "up"
            }Like`,
            data
          )
          .then(res => {
            if (res.data.success) {
              this.getLikes(data);
              if (this.isDislikedByUser) {
                this.getDislikes(data);
              }
            } else {
              console.log("failed");
            }
          });
      }
    },
    dislike(data) {
      if (this.isLoggedIn) {
        axios
          .post(
            `http://localhost:5000/api/like/${
              this.isDislikedByUser ? "un" : "up"
            }Dislike`,
            data
          )
          .then(res => {
            if (res.data.success) {
              this.getDislikes(data);
              if (this.isLikedByUser) {
                this.getLikes(data);
              }
            } else {
              console.log("failed");
            }
          });
      }
    }
  }
};
