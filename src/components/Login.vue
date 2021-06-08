<template>
  <div class="auth">
    <cadastrar :toggle="toggle" v-if="formState === 'cadastrar'"></cadastrar>
    <entrar v-if="formState === 'entrar'"></entrar>
    <p v-on:click="toggle" class="toggle">
      {{
        formState === "cadastrar"
          ? "Já está cadastrado? Relizar Login"
          : "Precisa criar uma conta? Cadastrar"
      }}
    </p>
  </div>
</template>

<script>
import Cadastrar from "./Cadastrar";
import Entrar from "./Entrar";
export default {
  name: "app",
  data() {
    return {
      formState: "cadastrar",
    };
  },
  methods: {
    toggle() {
      this.formState === "cadastrar"
        ? (this.formState = "entrar")
        : (this.formState = "cadastrar");
    },
  },
  components: {
    Cadastrar,
    Entrar,
  },
};
</script>

<style>
.auth {
  margin: 0 auto;
  width: 460px;
}
.toggle {
  cursor: pointer;
  font-size: 18px;
}
amplify-authenticator {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100vh;
}
</style>
