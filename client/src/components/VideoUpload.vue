<template>
  <div class="form__wrapper">
    <form class="upload-form" @submit.prevent="onSubmit">
      <h2 class="form__header">Добавить видео</h2>
      <input type="file" class="upload-form__file" @input="onInputVideo()" />
      <img
        v-if="fileUploaded"
        :src="require(`@/assets/${thumbnail}`)"
        class="upload-form__thumb"
      />
      <div class="form__group">
        <input
          type="text"
          class="form__input"
          placeholder=" "
          v-model="title"
        />
        <label class="form__label">Название</label>
      </div>
      <div class="form__group">
        <input
          type="text"
          class="form__input descr"
          placeholder=" "
          v-model="description"
        />
        <label class="form__label">Описание</label>
      </div>
      <select class="upload-form__select" v-model="videoPrivacy">
        <option value="0">Приватное</option>
        <option value="1">Публичное</option>
      </select>
      <select class="upload-form__select" v-model="videoCategory">
        <option value="film">Фильмы</option>
        <option value="auto">Авто</option>
        <option value="music">Музыка</option>
        <option value="animals">Животные</option>
        <option value="sports">Спорт</option>
      </select>
      <button type="submit" class="form__btn">Добавить</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "VideoUpload",
  data() {
    return {
      title: "",
      description: "",
      videoPrivacy: "0",
      videoCategory: "film",
      thumbnail: "video.jpg",
      filePath: "",
      fileUploaded: false
    };
  },
  computed: {
    isInvaild() {
      return (
        this.title.trim() === "" ||
        this.description.trim() === "" ||
        this.filePath === "" ||
        this.thumbnail === ""
      );
    },
    ...mapGetters(["user", "isLoggedIn"])
  },
  methods: {
    async onInputVideo() {
      let files = event.target.files;
      let formData = new FormData();
      const config = {
        header: {
          "content-type": "multipart/form-data"
        }
      };
      formData.append("file", files[0]);

      let response = await this.uploadFiles(formData, config);
      if (response.data.success) {
        this.filePath = response.data.filePath;
        this.fileUploaded = true;
      } else {
        this.fileUploaded = false;
        console.error("failed to upload video");
      }
    },
    async onSubmit() {
      if (!this.isLoggedIn) {
        return;
      }

      if (this.isInvaild) {
        return;
      }

      let variable = {
        writer: this.user._id,
        title: this.title,
        description: this.description,
        privacy: this.videoPrivacy,
        filePath: this.filePath,
        category: this.videoCategory,
        thumbnail: this.thumbnail
      };

      let res = await this.uploadVideo(variable);
      if (res.data.success) {
        console.log("video uploaded successfully");
        this.$router.push("/");
      } else {
        console.error("failed to upload video");
      }
    },
    ...mapActions(["uploadFiles", "createThumbnail", "uploadVideo"])
  }
};
</script>

<style lang="scss">
.upload-form {
  width: 60%;
  height: auto;

  &__file {
    margin-bottom: 20px;
  }

  &__select {
    display: block;
    margin: 15px 0;
  }

  &__thumb {
    display: block;
    width: 300px;
    height: 200px;
  }
}
</style>
