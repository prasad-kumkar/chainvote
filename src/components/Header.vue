<template>
    <div>
        <v-app-bar
      flat
      elevate-on-scroll
    >
      <p>CHAINVOTE</p>
      <v-spacer></v-spacer>
      <v-btn icon to="/"><v-icon>mdi-home</v-icon></v-btn>
      <v-btn text to="/app">App</v-btn>
      <v-btn text to="/docs">Docs</v-btn>
      <v-btn text to="/contact">Contact</v-btn>
      <v-btn v-if="auth.currentUser!=null" to="/settings"><v-icon>mdi-account</v-icon>{{userData.userProfile.name}}</v-btn>
      <v-btn v-else text to="/login">Log in</v-btn>
      <v-btn v-if="auth.currentUser!=null" icon @click="logout()"><v-icon>mdi-logout</v-icon></v-btn>
      <v-btn icon href="https://github.com/bchainify/chainvote"><v-icon>mdi-github</v-icon></v-btn>
    </v-app-bar>
    </div>
</template>




<script>
import { auth } from '../firebase'

export default {
    data: () => {
    return {
      auth
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  computed:{
    userData(){
      return this.$store.state
    }
  }
}
</script>

<style scoped>
    *{
        font-family: 'Roboto', 'Open Sans', 'Helvetica Neue', sans-serif;
    }
   p{
        
        font-size: 30px;
        letter-spacing: 5px;
        height: 50%;
        margin-left: 4vw;
    } 
</style>