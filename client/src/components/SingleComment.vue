<template>
  <div class="comment">
    <div class="comment__info">
      <img src="@/assets/avatar.jpg" alt="user avatar" />
      <div class="comment__content">
        <span class="comment__username">{{ comment.writer.username }}</span>
        <span class="comment__text">{{ comment.content }}</span>
        <div class="comment__likes-info">
          <div class="comment__likes">
            <img
              :src="require(`@/assets/${ isLikedByUser ? 'like_active' : 'like' }.svg`)"
              alt="like"
              @click="like(commentData)"
            />
            <span>{{likes.length}}</span>
          </div>
          <div class="comment__likes">
            <img
              :src="require(`@/assets/${ isDislikedByUser ? 'like_active' : 'like' }.svg`)"
              alt="dislike"
              style="transform: rotate(180deg)"
              @click="dislike(commentData)"
            />
            <span>{{dislikes.length}}</span>
          </div>
          <span class="comment__reply-btn" @click="replyOpened = !replyOpened"
            >Ответить</span
          >
        </div>
      </div>
    </div>
    <form v-if="replyOpened" class="comments__form" @submit.prevent="onSubmit">
      <textarea
        placeholder="Оставьте комментарий..."
        class="comments__text-input"
        v-model="commentText"
      />
      <button
        type="submit"
        class="comments__submit-btn"
        :disabled="!commentText.trim()"
      >
        Отправить
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import likeDislike from '../mixins/likeDislike'

export default {
  name: "SingleComment",
  props: {
    comment: {
      type: Object,
      required: true
    },
    postId: {
      required: true
    }
  },
  mixins: [likeDislike],
  data() {
    return {
      commentText: "",
      replyOpened: false
    };
  },
  created() {
    this.getLikes(this.commentData)
    this.getDislikes(this.commentData)
  },
  computed: {
    commentData() {
      return {
        userId: this.user._id,
        commentId: this.comment._id
      }
    },
    ...mapGetters(["user", 'isLoggedIn'])
  },
  methods: {
    onSubmit() {
      const data = {
        content: this.commentText.trim(),
        writer: this.user._id,
        postId: this.postId,
        responseTo: this.comment._id
      };

      this.saveComment(data).then(res => {
        if (res.data.success) {
          console.log(res.data);
          this.$emit("newComment", res.data.result);
          this.commentText = "";
          this.replyOpened = false;
        } else {
          console.error("failed to save comment");
        }
      });
    },
    ...mapActions(["saveComment"])
  }
};
</script>

<style lang="scss">
.comment {
  margin-bottom: 1rem;

  &__info {
    display: flex;
    margin: 1rem 0;
    width: 100%;

    & > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 15px;
    }
  }

  &__content {
    display: flex;
    flex-flow: column nowrap;
    width: 80%;
  }

  &__text {
    font-size: 1.2rem;
  }

  &__username {
    color: grey;
  }

  &__likes-info {
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

  &__reply-btn {
    color: grey;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
