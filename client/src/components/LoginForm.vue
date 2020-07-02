<template>
  <div class="form__wrapper">
    <form class="form" @submit.prevent="loginUser">
      <h2 class="form__header">Войти</h2>
      <div class="form__group">
        <input
          type="text"
          class="form__input"
          placeholder=" "
          v-model="username"
        />
        <label class="form__label">Логин</label>
      </div>
      <div class="form__group">
        <input
          type="password"
          class="form__input"
          placeholder=" "
          v-model="password"
        />
        <label class="form__label">Пароль</label>
      </div>
      <button type="submit" class="form__btn">Войти</button>
      <router-link to="/register" class="link-btn"
        >Зарегестрироваться</router-link
      >
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: mapGetters(["isLoggedIn"]),
  methods: {
    loginUser() {
      let user = {
        username: this.username,
        password: this.password
      };
      this.login(user).then(res => {
        if (res.data.success) {
          this.$router.push("/");
        }
      });
    },
    ...mapActions(["login"])
  }
};
</script>

<style lang="scss"></style>
