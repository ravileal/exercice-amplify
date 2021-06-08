<template>
  <div>
    <h2>{{ formState === "cadastrar" ? "Cadastrar" : "Confirm Cadastrar" }}</h2>
    <div class="formcontainer" v-if="formState === 'cadastrar'">
      <input placeholder="username" v-model="form.username" class="input" />
      <input
        placeholder="password"
        type="password"
        v-model="form.password"
        class="input"
      />
      <input placeholder="email" v-model="form.email" class="input" />
      <button v-on:click="cadastrar" class="button">Cadastrar</button>
    </div>
    <div class="formcontainer" v-if="formState === 'confirmSignUp'">
      <input
        placeholder="confirmation code"
        v-model="form.authCode"
        class="input"
      />
      <button v-on:click="confirmSignUp" class="button">
        Confirm Cadastrar
      </button>
    </div>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  name: "home",
  props: ["toggle"],
  data() {
    return {
      formState: "cadastrar",
      form: {
        username: "",
        password: "",
        email: "",
      },
    };
  },
  methods: {
    async cadastrar() {
      const { username, password, email } = this.form;
      await Auth.signUp({
        username,
        password,
        attributes: { email },
      });
      this.formState = "confirmSignUp";
    },
    async confirmSignUp() {
      const { username, authCode } = this.form;
      await Auth.confirmSignUp(username, authCode);
      alert("successfully signed up! Sign in to view the app.");
      this.toggle();
    },
  },
};
</script>

<style>
.formcontainer {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 0 auto;
}
.input {
  margin-bottom: 7px;
  height: 38px;
  border: none;
  outline: none;
  border-bottom: 2px solid #ddd;
  font-size: 20px;
}
.button {
  height: 45px;
  border: none;
  outline: none;
  background-color: #dddddd;
  margin-top: 8px;
  cursor: pointer;
  font-size: 18px;
}
.button:hover {
  opacity: 0.7;
}
</style>
