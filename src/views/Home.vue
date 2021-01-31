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
    
    <div class="features">
        <h1>Features</h1>
        <v-row no-gutters>
        <v-col class="feature-cards">
            
            <v-card min-width="300px" max-width="25%" style="margin: 50px 0px;">
                <v-img
                src="../assets/opensource.png"
                width="100%"
                ></v-img>
                <v-card-title>Open Source</v-card-title>
                <v-card-subtitle>Source Code is completely open-sourced at <a href="https://github.com/bchainify">Github</a>, managed by community all over the world </v-card-subtitle>
            </v-card>
            <v-card min-width="300px"  max-width="25%" style="margin: 50px 0px;">
                <v-img
                src="../assets/secure.png"
                width="100%"
                ></v-img>
                <v-card-title>Secure</v-card-title>
                <v-card-subtitle>The benefits of using a immutable distributed ledger and self sovereign identity verification ensures the votes are casted by the right person.</v-card-subtitle>
            </v-card>
            <v-card min-width="300px" max-width="25%" style="margin: 50px 0px;">
                <v-img
                src="../assets/anonymous.png"
                width="100%"
                ></v-img>
                <v-card-title>Anonymity</v-card-title>
                <v-card-subtitle>For privacy, we protect voters through the use of homomorphic encryption, all the votes will be casted and counted anonymously </v-card-subtitle>
            </v-card>
        </v-col>
        
    </v-row>
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
.features{
    margin-top: 100px;
}
.feature-cards{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

</style>