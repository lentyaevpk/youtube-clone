<template>
  <div class="liked-videos">
    <h2>Понравившиеся</h2>
    <hr />
    <div v-if="videos.length" class="liked-videos__videos">
      <VideoCard v-for="video in videos" :key="video._id" :video="video" />
    </div>
    <h3 v-else>Нет видео!</h3>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VideoCard from '../components/VideoCard'

export default {
  name: "LikedVideosPage",
  components: {
    VideoCard
  },
  data() {
    return {
      videos: []
    };
  },
  async created() {
    if (!this.user._id) {
      await this.getProfile();
    }
    await this.fetchLikedVideos();
  },
  computed: mapGetters(["user"]),
  methods: {
    fetchLikedVideos() {
      let data = {
        userId: this.user._id
      };

      this.getLikedVideos(data).then(response => {
        if (response.data.success) {
          this.videos = response.data.videos
        } else {
          console.error("failed to load videos");
        }
      });
    },
    ...mapActions(["getProfile", "getLikedVideos"])
  }
};
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}

.liked-videos {
  width: 85%;
  margin: 6rem auto 3rem;

  &__videos {
    display: flex;
    flex-flow: row wrap;
  }
}
</style>
