<template>
  <div class="auth">
    <Cadastro :toggle="toggle" v-if="toggleCadastrar" />
    <Entrar v-if="!toggleCadastrar" />

    <p v-on:click="toggle" class="toggle">
      {{ toggleMensagem() }}
    </p>
  </div>
</template>

<script>
import Cadastro from "./Cadastro";
import Entrar from "./Entrar";

export default {
  name: "autenticacao",
  data() {
    return {
      toggleCadastrar: false,
    };
  },
  methods: {
    toggle() {
      this.toggleCadastrar = !this.toggleCadastrar;
    },
    toggleMensagem() {
      return this.toggleCadastrar
        ? "Já está cadastrado? Relizar Login"
        : "Precisa criar uma conta? Cadastrar";
    },
  },
  components: {
    Cadastro,
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
</style>
