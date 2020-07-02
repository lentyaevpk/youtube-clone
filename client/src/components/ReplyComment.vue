<template>
  <div class="reply-comment">
    <p
      v-if="comments.length"
      class="reply-comment__more"
      @click="showReplies = !showReplies"
    >
      Показать {{ comments.length }} ответ(-ов)
    </p>
    <div v-if="showReplies">
      <div
        v-for="comment in comments"
        :key="comment._id"
        class="reply-comment__content"
      >
        <SingleComment
          :comment="comment"
          :postId="postId"
          @newComment="emitComment"
        />
        <ReplyComment
          :commentLists="commentLists"
          :comment="comment"
          :parentCommentId="comment._id"
          :postId="postId"
          @newComment="emitComment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SingleComment from "./SingleComment";

export default {
  name: "ReplyComment",
  components: {
    SingleComment
  },
  props: {
    commentLists: {
      type: Array,
      required: true
    },
    postId: {
      required: true
    },
    comment: {
      type: Object,
      required: true
    },
    parentCommentId: {
      required: true
    }
  },
  data() {
    return {
      showReplies: false
    };
  },
  computed: {
    comments() {
      return this.commentLists.filter(
        comment => comment.responseTo === this.parentCommentId
      );
    }
  },
  methods: {
    emitComment(newComment) {
      this.$emit("newComment", newComment);
    }
  }
};
</script>

<style lang="scss">
.reply-comment {
  &__content {
    margin-left: 50px;
    width: 80%;
  }

  &__more {
    color: grey;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
