<template>
  <header class="header">
    <div class="header__left-side">
      <router-link to="/" class="header__home-btn">
        <img src="@/assets/youtube.svg" alt="home btn" />
      </router-link>
      <router-link to="/liked" class="header__btn">Понравившиеся</router-link>
    </div>
    <div class="header__right-side">
      <router-link to="/video/upload" class="header__btn"
        >Загрузить видео</router-link
      >
      <button class="header__btn" @click="logoutUser">Выйти</button>
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Header",
  methods: {
    logoutUser() {
      this.logout();
    },
    ...mapActions(["logout"])
  }
};
</script>

<style lang="scss">
.header {
  position: fixed;
  padding: 0px 15px;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: #fff;
  box-shadow: 1px 1px 6px black;
  z-index: 10;

  &__left-side {
    display: flex;
  }

  &__right-side {
    display: flex;
  }

  &__btn {
    border: none;
    background-color: #fff;
    line-height: 70px;
    padding: 0px 10px;
    transition: 0.4s;
    text-decoration: none;
    color: black;
    font-weight: 300;
    cursor: pointer;

    &:hover {
      background-color: rgb(172, 172, 172);
    }
  }

  &__home-btn {
    height: 70px;
    margin-right: 1rem;

    & img {
      height: 100%;
    }
  }
}
</style>
