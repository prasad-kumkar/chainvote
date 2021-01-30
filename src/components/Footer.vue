<template>
    <div>
    <div class="footer">
        <div class="logo">
            <p class="logo-icon">CHAINVOTE</p>
            <div class="bchainify"><p>by </p> <img class="bchainify-logo" src="../assets/image0.png" alt="bchainify"></div>
            <p>a non-profit organization</p>
        </div>
      <v-spacer></v-spacer>
        <div class="logo">
            <p>contact@bchainify.org</p>
      <p>+1xxxxxxx</p>
        </div>
        <div class="icons">
            <div class="icon"><v-btn icon><v-icon>mdi-github</v-icon></v-btn></div>
            <div class="icon"><v-btn icon><v-icon>mdi-linkedin</v-icon></v-btn></div>
            <div class="icon"><v-btn icon><v-icon>mdi-twitter</v-icon></v-btn></div>
        </div>
    </div>
    </div>
</template>

<style scoped>
    *{
        font-family: 'Roboto', 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .footer{
        display: flex;
        padding: 2vw;
        background-color: white;
    }
    .logo{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
   .logo-icon{
        font-size: 30px;
        letter-spacing: 5px;
        height: 50%;
    } 
    .icon{
        padding: 0.1vw;
    }
    .icons{
        display: flex;
        padding-left: 1vw;
    }
    .bchainify{
        display: flex;
        align-items: center;
    }
    .bchainify-logo{
        width: 200px;
    }
</style>
