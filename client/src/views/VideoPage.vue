<template>
  <div class="vp">
    <div class="vp__left-side">
      <SingleVideo
        :video="video"
        :subs="subs"
        :videoLoaded="videoLoaded"
        @subscribe="subscribeUser"
        @unsubscribe="unsubscribeUser"
      />
      <Comments
        :postId="video._id"
        :commentLists="commentLists"
        @newComment="updateComment"
      />
    </div>
    <div class="vp__right-side">
      <SideVideos />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SingleVideo from "../components/SingleVideo";
import SideVideos from "../components/SideVideos";
import Comments from "../components/Comments";

export default {
  name: "VideoPage",
  components: {
    SingleVideo,
    SideVideos,
    Comments
  },
  data() {
    return {
      video: {},
      subs: [],
      commentLists: [],
      videoLoaded: false
    };
  },
  async created() {
    if (!this.user._id) {
      await this.getProfile();
    }
    await this.fetchVideo();
    await this.fetchSubs();
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  watch: {
    async $route() {
      await this.fetchVideo();
      await this.fetchSubs();
    }
  },
  methods: {
    fetchVideo() {
      const data = {
        videoId: this.$route.params.videoId
      };
      this.videoLoaded = false

      return this.getVideo(data)
        .then(res => {
          if (res.data.success) {
            this.video = res.data.video;
            this.videoLoaded = true
          } else {
            console.error("failed to get video");
          }
          return this.getComments(data);
        })
        .then(comments => {
          if (comments.data.success) {
            this.commentLists = comments.data.comments;
          } else {
            console.log("failed to get comments");
          }
        });
    },
    fetchSubs() {
      const data = {
        userTo: this.video.writer._id,
        userFrom: this.user._id
      };

      this.getSubs(data).then(response => {
        if (response.data.success) {
          this.subs = response.data.subscribers;
        } else {
          console.error("failed to get subs");
        }
      });
    },
    subscribeUser() {
      const data = {
        userTo: this.video.writer._id,
        userFrom: this.user._id
      };

      this.subscribe(data).then(response => {
        if (response.data.success) {
          this.fetchSubs();
        } else {
          console.error("failed to get subs");
        }
      });
    },
    unsubscribeUser() {
      const data = {
        userTo: this.video.writer._id,
        userFrom: this.user._id
      };

      this.unsubscribe(data).then(response => {
        if (response.data.success) {
          this.fetchSubs();
        } else {
          console.error("failed to get subs");
        }
      });
    },
    updateComment(newComment) {
      console.log("here", newComment);
      this.commentLists = this.commentLists.concat(newComment);
    },
    ...mapActions([
      "getVideo",
      "getProfile",
      "getSubs",
      "subscribe",
      "unsubscribe",
      "getComments"
    ])
  }
};
</script>

<style lang="scss">
.vp {
  margin: 100px 50px 50px;
  display: flex;
  flex-flow: row wrap;

  &__left-side {
    width: 70%;
  }

  &__right-side {
    width: 30%;
  }
}
</style>
