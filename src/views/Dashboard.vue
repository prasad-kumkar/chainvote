<template>
  <div class="home">
    <div class="dash-header">
      <h1>Active Elections</h1>
      <v-spacer></v-spacer>
    <v-btn color="primary" to="/new">Create a new Election</v-btn></div>
    <v-row no-gutters>
    <v-col v-for="(ballot, index) in userData.ballots" :key="index" id="cards">
      <v-card color="teal lighten-5" max-width="350px" style="margin: 20px">
        <v-card-title>
          {{ballot.ballot.name}}
          <v-card-subtitle>{{"by " + ballot.ballot.organization}}</v-card-subtitle>
        </v-card-title>
        <v-card-subtitle>{{ballot.ballot.description}}</v-card-subtitle>
        <v-chip-group>
          <v-card-subtitle>Start</v-card-subtitle>
          <v-chip  color="white">{{ballot.ballot.startDate}}</v-chip>
          <v-chip  color="white">{{ballot.ballot.startTime}}</v-chip>
        </v-chip-group>
        <v-chip-group>
          <v-card-subtitle>End</v-card-subtitle>
          <v-chip color="white">{{ballot.ballot.endDate}}</v-chip>
          <v-chip color="white">{{ballot.ballot.endTime}}</v-chip>
        </v-chip-group>
        <v-card-actions>
          <v-btn
            color="teal"
            text
            v-bind:to="encodeURI('/booth/'+ballot.ballot.name)"
          >
            Vote
          </v-btn>
          <v-btn
            color="teal"
            text
            v-bind:to="encodeURI('/booth/'+ballot.ballot.name+'/details')"
          >
            Details
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import {auth} from '../firebase'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
  },
  data: () => {
    return{
      auth,
    }
  },
  computed: {
    ...mapState(['userProfile', 'ballots']),
    userData(){
      return this.$store.state
    }
  }
}
</script>


<style lang="css">
  .home{
    margin: 100px 5% 5% 5%;
    padding: 20px;
    background-color: white;
  }
  .dash-header{
    display: flex;
    padding: 3% 5% 3% 3%;
  }
</style>
