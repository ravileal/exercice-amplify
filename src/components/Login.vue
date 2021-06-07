<template>
  <div class="container">
    <!-- <amplify-authenticator>
    </amplify-authenticator> -->
    <div v-if="authState === 'signedin' && user"> 
      <h1> teste</h1>
      <Home :user="user" />
    </div>
    <form @submit.prevent="login">
        <h2>Login</h2>
        <input type="text" v-model="email" placeholder="Email address..." />
        <input type="password" v-model="password" placeholder="password..." />
        <button v-on:click="login">Login</button>
    </form>
    
</div>
</template>

<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Auth } from 'aws-amplify';
import Home from "./Home";

export default {
  name: "Login",
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    });
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
      email:'',
      password: ''
    };
  },
  beforeUnmount() {
    this.unsubscribeAuth();
  },
  components: {
    Home,
  },
  methods: {
    async login() {
    try {
      //console.log(this.email)
        const u = await Auth.signIn(this.email, this.password);
        //this.unsubscribeAuth = u.onAuthUIStateChange
        console.log(u.username)
        this.user = {username:u.username}
        this.authState = "signedin";
        alert('Successfully logged in');
    } catch (error) {
        alert(error.message);
    }
},
  }
  
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
amplify-authenticator {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100vh;
}
</style>
