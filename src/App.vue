<template>
  <div id="app">
    <div class="nav">
      <router-link tag="p" to="/">
        <a>Home </a>
      </router-link>
      <router-link tag="p" to="/login" v-if="!signedIn">
        <a>Login</a>
      </router-link>
    </div>
    <router-view></router-view>
    <div class="sign-out">
      <amplify-sign-out v-if="signedIn"></amplify-sign-out>
    </div>
  </div>
</template>

<script>
import { Auth, Hub } from "aws-amplify";

export default {
  name: "app",
  data() {
    return {
      signedIn: false,
    };
  },
  beforeCreate() {
    Hub.listen("auth", (data) => {
      console.log("data:", data);
      const { payload } = data;

      if (payload.event === "signIn") {
        this.signedIn = true;
        this.$router.push("/");
      }
      if (payload.event === "signOut") {
        this.$router.push("/login");
        this.signedIn = false;
      }
    });
    Auth.currentAuthenticatedUser()
      .then(() => {
        this.signedIn = true;
      })
      .catch(() => (this.signedIn = false));
  },
  components: {
    // Login,
  },
};
</script>

<style>
.nav {
  display: flex;
}
.nav p {
  padding: 0px 30px 0px 0px;
  font-size: 18px;
  color: #000;
}
.nav p:hover {
  opacity: 0.7;
}
.nav p a {
  text-decoration: none;
}
.sign-out {
  width: 160px;
  margin: 0 auto;
}
</style>
