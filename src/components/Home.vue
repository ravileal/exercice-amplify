<template>
  <div>
    <div>Pagin home</div>

    <div v-if="logado">
      <button @click="sair" class="sign-out">
        Sair
      </button>
    </div>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";

export default {
  name: "Home",
  data() {
    return {
      logado: false,
    };
  },
  methods: {
    sair() {
      Auth.signOut()
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    },
  },
  async beforeCreate() {
    this.logado = await Auth.currentAuthenticatedUser()
      .then(() => true)
      .catch(() => false);

    if (!this.logado) this.$router.push("/autenticacao");
  },
};
</script>

<style scoped>
.sign-out {
  width: 160px;
  margin: 0 auto;
}
</style>
