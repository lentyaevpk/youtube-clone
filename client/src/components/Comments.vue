<template>
  <div class="comments">
    <br />
    <p>{{ commentLists.length }} комментариев</p>
    <hr />
    <div v-for="comment in noResponseComments" :key="comment._id">
      <SingleComment
        :comment="comment"
        :postId="postId"
        @newComment="emitComment"
      />
      <ReplyComment
        :commentLists="commentLists"
        :comment="comment"
        :postId="postId"
        :parentCommentId="comment._id"
        @newComment="emitComment"
      />
    </div>
    <form class="comments__form" @submit.prevent="onSubmit">
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
import { mapGetters, mapActions } from "vuex";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

export default {
  name: "Comments",
  components: {
    SingleComment,
    ReplyComment
  },
  props: {
    postId: {
      required: true
    },
    commentLists: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      commentText: ""
    };
  },
  computed: {
    noResponseComments() {
      return this.commentLists.filter(comment => !comment.responseTo);
    },
    ...mapGetters(["user"])
  },
  methods: {
    onSubmit() {
      const data = {
        content: this.commentText.trim(),
        writer: this.user._id,
        postId: this.postId
      };

      this.saveComment(data).then(response => {
        if (response.data.success) {
          this.emitComment(response.data.result);
          this.commentText = "";
        } else {
          console.error("failed to save comment");
        }
      });
    },
    emitComment(newComment) {
      this.$emit("newComment", newComment);
    },
    ...mapActions(["saveComment"])
  }
};
</script>

<style lang="scss">
.comments {
  &__form {
    display: flex;
  }

  &__text-input {
    width: 100%;
  }

  &__submit-btn {
    width: 20%;
  }
}
</style>
