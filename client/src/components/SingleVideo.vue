<template>
  <div>
    <video
      :src="`http://localhost:5000/${video.filePath}`"
      class="vp__player"
      controls
    ></video>
    <div class="vp__info">
      <img src="@/assets/avatar.jpg" alt="user avatar" />
      <div class="vp__video-info">
        <span class="vp__title">{{ video.title }}</span>
        <span class="vp__subscr-amount">{{ subs.length }} подписчиков</span>
        <span class="vp__descr">{{ video.description }}</span>
      </div>
      <div class="vp__likes-info">
        <div class="vp__likes">
          <img
            :src="require(`@/assets/${ isLikedByUser ? 'like_active' : 'like' }.svg`)"
            alt="like"
            @click="like(videoData)"
          />
          <span>{{likes.length}}</span>
        </div>
        <div class="vp__likes">
          <img
            :src="require(`@/assets/${ isDislikedByUser ? 'like_active' : 'like' }.svg`)"
            alt="dislike"
            style="transform: rotate(180deg)"
            @click="dislike(videoData)"
          />
          <span>{{dislikes.length}}</span>
        </div>
      </div>
      <button
        :class="[
          'vp__subscribe-btn',
          { 'vp__subscribe-btn--grey': isSubscribed }
        ]"
        @click="emitSubscribe"
      >
        {{ isSubscribed ? "Вы подписаны" : "Подписаться" }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import likeDislike from '../mixins/likeDislike'

export default {
  name: "SingleVideo",
  props: {
    video: {
      type: Object,
      required: true
    },
    subs: {
      type: Array,
      required: true
    },
    videoLoaded: {
      type: Boolean,
      required: true
    }
  },
  mixins: [likeDislike],
  watch: {
    videoLoaded() {
      this.getLikes(this.videoData),
      this.getDislikes(this.videoData)
    }
  },
  computed: {
    videoData() {
      return {
        userId: this.user._id,
        videoId: this.video._id
      }
    },
    isSubscribed() {
      return this.subs.some(sub => sub.userFrom === this.user._id && sub.userTo === this.video.writer._id);
    },
    ...mapGetters(["user", 'isLoggedIn'])
  },
  methods: {
    emitSubscribe() {
      if (this.isSubscribed) {
        this.$emit("unsubscribe");
      } else {
        this.$emit("subscribe");
      }
    }
  }
};
</script>

<style lang="scss">
.vp {
  &__player {
    width: 100%;
    // height: 450px;
  }

  &__info {
    display: flex;
    margin-top: 1rem;
    width: 100%;

    & > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 15px;
    }
  }

  &__video-info {
    display: flex;
    flex-flow: column nowrap;
    padding-top: 10px;
    width: 70%;
  }

  &__title {
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
      color: rgb(31, 184, 231);
    }
  }

  &__subscr-amount {
    color: grey;
    margin-top: 5px;
  }

  &__descr {
    margin-top: 1rem;
    color: grey;
  }

  &__subscribe-btn {
    align-self: center;
    border: none;
    color: #fff;
    background-color: red;
    border-radius: 4px;
    cursor: pointer;
    height: 40px;
    text-transform: uppercase;

    &--grey {
      background-color: rgba(0, 0, 0, 0.1);
      color: #606060;
    }
  }

  &__likes-info {
    align-self: center;
    display: flex;
    margin-top: 1rem;
  }

  &__likes {
    margin-right: 1rem;
    color: grey;

    & img {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin-right: 5px;
    }
  }
}
</style>
