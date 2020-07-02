<template>
  <div class="side-vid">
    <div v-for="video in videos" :key="video._id" class="side-vid__item">
      <router-link :to="`${video._id}`" class="side-vid__thumb">
        <img
          :src="require(`@/assets/${video.thumbnail}`)"
          alt="video preview"
        />
      </router-link>
      <div class="side-vid__info">
        <span class="side-vid__title">{{ video.title }}</span>
        <span class="side-vid__user">{{ video.writer.username }}</span>
        <span class="side-vid__views">{{ `${video.views} просмотров` }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SideVideos",
  data() {
    return {
      videos: []
    };
  },
  created() {
    this.getVideos().then(response => {
      if (response.data.success) {
        this.videos = response.data.videos;
      } else {
        console.error("failed to load videos");
      }
    });
  },
  methods: mapActions(["getVideos"])
};
</script>

<style lang="scss">
.side-vid {
  width: 100%;
  padding: 20px;

  &__item {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 1rem;
  }

  &__thumb {
    width: 60%;

    & img {
      width: 100%;
    }
  }

  &__info {
    padding-left: 1rem;
    padding-top: 1rem;
    display: flex;
    flex-flow: column nowrap;
  }

  &__title {
    margin-bottom: 5px;
  }

  &__user {
    color: grey;
    margin-bottom: 5px;
    font-size: 0.9rem;
  }

  &__views {
    color: grey;
    font-size: 0.9rem;
  }
}
</style>
