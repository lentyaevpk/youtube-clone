<template>
  <div class="form__wrapper">
    <form class="form" @submit.prevent="registerUser">
      <h2 class="form__header">Зарегестрироваться</h2>
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
      <div class="form__group">
        <input
          type="password"
          class="form__input"
          placeholder=" "
          v-model="confirmPassword"
        />
        <label class="form__label">Подтвердите пароль</label>
      </div>
      <button type="submit" class="form__btn">Зарегестрироваться</button>
      <router-link to="/login" class="link-btn">Войти</router-link>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "RegisterForm",
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    equalPasswords() {
      return this.password === this.confirmPassword;
    },
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    registerUser() {
      const user = {
        username: this.username,
        password: this.password,
        confirm_password: this.confirmPassword
      };

      if (this.equalPasswords) {
        this.register(user).then(res => {
          if (res.data.success) {
            this.login(user).then(() => {
              this.$router.push("/");
            });
          }
        });
      }
    },
    ...mapActions(["register", "login"])
  }
};
</script>

<style lang="scss"></style>
