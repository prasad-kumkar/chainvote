<template>
  <div class="home">
    <div class="poster">
      <h1>Vote for change</h1>
      <h1>Vote for a better future</h1>
      <p>With the most secure voting platform</p>
    </div>
    <div class="heading">
      <h1>Active Elections</h1>
      <v-spacer></v-spacer>
      <v-btn color="white" to="/new">Start a new Election</v-btn>
    </div>
    <div class="cards">
    <v-row no-gutters>
    <v-col v-for="(ballot, index) in userData.ballots" :key="index" id="cards">
      <v-card min-width="300px" max-width="25%" style="margin: 50px 0px;">
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


<style lang="css" scoped>
  .home{
    padding: 20px;
    background-image: linear-gradient(rgb(245, 245, 245), rgb(252, 130, 130),rgb(118, 118, 248));
    height: 100%;
  }
  .poster{
    padding:5vw;
  }
  .poster h1{
    font-size: 50px;
  }
  .poster p{
    font-size: 30px;
  }
  .heading{
    display: flex;
    padding: 2vw 5vw;
  }
  #cards{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
