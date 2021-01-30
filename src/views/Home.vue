<template>
  <div class="home">
    <div class="poster">
      <p class="title">
        Open-Sourced | Anonymous | Distributed
        </p>
      <p class="sub-title">
          Chainvote is the <b>most secure voting platform</b>.
        </p>
        <p>{{electionCount}}+ Elections conducted</p>
        <p>{{identityCount}}+ Decentralized Identities stored</p>
        <p>Trusted by {{companiesCount}}+ companies. </p>
        <v-btn class="try" to="/app">Try it out</v-btn> <br/>
        <!--v-btn class="try" text> Pricing</v-btn-->
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: { 
  },
  data: () => {
    return{
      electionCount: 0,
      identityCount: 0,
      companiesCount: 0
    }
      
      
    }
}
</script>
<style scoped>
.home{
    font-family: 'Roboto', 'Open Sans', 'Helvetica Neue', sans-serif;
    background-image: linear-gradient(rgb(245, 245, 245), rgb(252, 130, 130), rgb(118, 118, 248));
    height: 100%;
 }
.poster{
  padding: 5vh 5vw;
  letter-spacing: 2px;
}
.poster .sub-title{
  font-size: 50px;
}
.poster .sub-title{
  font-size: 40px;
}
.try{
  margin-top: 3vh;
}
.link{
  text-decoration: none;
  margin: 10px;
}
</style>