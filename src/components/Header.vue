<template>
    <div>
        <v-app-bar
            absolute
            color="teal lighten-3"
            dark>
        <a href="/" style="color: white; font-size: 15px; margin-left:30px; text-decoration: none;"><h1>WYVote</h1></a>
        <v-spacer></v-spacer>
        <v-btn v-if="auth.currentUser==null" icon to="/login"><v-icon>mdi-login</v-icon></v-btn>
        <v-btn icon to="/"><v-icon>mdi-home</v-icon></v-btn>
        <v-btn v-if="auth.currentUser!=null" icon to="/settings"><v-icon>mdi-looks</v-icon></v-btn>
        <v-btn v-if="auth.currentUser!=null" style="background-color: teal"><v-icon>mdi-account</v-icon>{{userData.userProfile.name}}</v-btn>
        <v-btn v-if="auth.currentUser!=null" icon @click="logout()"><v-icon>mdi-logout</v-icon></v-btn>
        </v-app-bar>
      <router-view></router-view>
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