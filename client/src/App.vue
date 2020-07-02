<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Header
  },
  created() {
    if (this.isLoggedIn && !this.user._id) {
      this.getProfile();
    }
  },
  computed: mapGetters(["isLoggedIn", "user"]),
  methods: mapActions(["getProfile"])
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: Ubuntu, Arial;
}

#app {
  width: 100%;
  height: 100%;
}

.form__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.form {
  width: 300px;
  background-color: rgb(236, 232, 232);
  padding: 20px;
  border-radius: 4px;

  &__header {
    margin: 10px 0;
    text-align: center;
  }

  &__group {
    position: relative;
    margin-bottom: 20px;
  }

  &__label {
    position: absolute;
    top: calc(50% - 9px);
    left: 0;
    color: #9c9c9c;
    transition: 0.3s;
    font-size: 18px;
  }

  &__input {
    width: 100%;
    height: 50px;
    background: transparent;
    color: black;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    transition: 0.3s;
    font-size: 18px;

    &:focus {
      & ~ .form__label {
        top: calc(0% - 7px);
        font-size: 12px;
      }
    }

    &:not(:placeholder-shown) {
      & ~ .form__label {
        top: calc(0% - 7px);
        font-size: 12px;
      }
    }
  }

  &__btn {
    color: white;
    background-color: rgb(18, 73, 145);
    border-radius: 3px;
    border: none;
    padding: 10px;
  }
}

.link-btn {
  display: block;
  margin: 10px 0;
}
</style>
