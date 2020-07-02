<template>
  <div class="lp">
    <h2>Рекомендованное</h2>
    <hr />
    <div v-if="videos.length" class="lp__videos">
      <VideoCard v-for="video in videos" :key="video._id" :video="video" />
    </div>
    <h3 v-else>Нет видео!</h3>
  </div>
</template>

<script>
import VideoCard from "../components/VideoCard";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LandingPage",
  components: {
    VideoCard
  },
  data() {
    return {
      videos: []
    };
  },
  created() {
    this.fetchVideos();
  },
  computed: mapGetters(["user"]),
  methods: {
    fetchVideos() {
      this.getVideos().then(response => {
        if (response.data.success) {
          this.videos = response.data.videos;
        } else {
          console.error("failed to load videos");
        }
      });
    },
    ...mapActions(["getVideos"])
  }
};
</script>

<style lang="scss">
.lp {
  width: 85%;
  margin: 6rem auto 3rem;

  &__videos {
    display: flex;
    flex-flow: row wrap;
  }
}
</style>
