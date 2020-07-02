<template>
  <div class="video-card">
    <div class="video-card__prev" @click="$router.push(`/video/${video._id}`)">
      <img :src="require(`@/assets/${video.thumbnail}`)" alt="video preview" />
      <span class="video-card__duration">{{ "n/a" }}</span>
    </div>
    <div class="video-card__info">
      <img src="@/assets/avatar.jpg" alt="user avatar" />
      <div class="video-card__descr">
        <span class="video-card__title">{{ video.title }}</span>
        <span class="video-card__username">{{ video.writer.username }}</span>
        <span class="video-card__views-date">{{
          `${video.views} просмотров - ${createDate}`
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "VideoCard",
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  computed: {
    createDate() {
      return dayjs(this.video.createdAt).format("MMM D YYYY");
    }
  }
};
</script>

<style lang="scss">
.video-card {
  margin: 1rem;
  flex-basis: 22%;

  &__prev {
    width: 100%;
    position: relative;
    cursor: pointer;

    & img {
      width: 100%;
    }
  }

  &__duration {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 3px;
  }

  &__info {
    padding: 5px 0;
    display: flex;

    & img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 15px;
    }
  }

  &__descr {
    display: flex;
    flex-flow: column nowrap;
    padding-top: 10px;
  }

  &__title {
    margin-bottom: 10px;
  }

  &__username {
    color: grey;
    margin-bottom: 5px;
  }

  &__views-date {
    color: grey;
  }
}
</style>
