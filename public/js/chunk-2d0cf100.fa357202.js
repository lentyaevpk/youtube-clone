(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cf100"],{"61b1":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"form__wrapper"},[e("form",{staticClass:"form",on:{submit:function(s){return s.preventDefault(),t.loginUser(s)}}},[e("h2",{staticClass:"form__header"},[t._v("Войти")]),e("div",{staticClass:"form__group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form__input",attrs:{type:"text",placeholder:" "},domProps:{value:t.username},on:{input:function(s){s.target.composing||(t.username=s.target.value)}}}),e("label",{staticClass:"form__label"},[t._v("Логин")])]),e("div",{staticClass:"form__group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form__input",attrs:{type:"password",placeholder:" "},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}}),e("label",{staticClass:"form__label"},[t._v("Пароль")])]),e("button",{staticClass:"form__btn",attrs:{type:"submit"}},[t._v("Войти")]),e("router-link",{staticClass:"link-btn",attrs:{to:"/register"}},[t._v("Зарегестрироваться")])],1)])},r=[],o=e("5530"),n=e("2f62"),i={name:"LoginForm",data:function(){return{username:"",password:""}},beforeRouteEnter:function(t,s,e){e((function(t){t.isLoggedIn&&e("/")}))},computed:Object(n["c"])(["isLoggedIn"]),methods:Object(o["a"])({loginUser:function(){var t=this,s={username:this.username,password:this.password};this.login(s).then((function(s){s.data.success&&t.$router.push("/")}))}},Object(n["b"])(["login"]))},u=i,l=e("2877"),c=Object(l["a"])(u,a,r,!1,null,null,null);s["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0cf100.fa357202.js.map