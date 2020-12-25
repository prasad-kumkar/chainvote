<template>
    <div class="booth">
        <div v-for="(ballot, index) in this.$store.state.ballots" :key="index">
            <div v-if="ballot.ballot.name==boothName" >
                <p hidden>{{sb = ballot.subBallot}} </p>
                <h1>{{ballot.ballot.name +" Results"}}</h1>
                <p>{{ballot.ballot.description}} 
                    </p><p>
                    by {{ballot.ballot.organization}}</p>
                <v-row>
                    <v-col>
                        <v-row v-for="(b, i) in ballot.subBallot" :key="i">
                           <v-btn style="margin: 10px" @click="select(i, ballot.subBallot[i].id)">
                               {{b.value[0]}}
                               </v-btn> 
                        </v-row>
                    </v-col>
                    <v-col>
                        <h2>{{ballot.subBallot[selectedBallot].value[0]}}</h2>
                        
                        <v-list >
                            <v-list-item v-for="item in result" :key="item.votableId">{{item.name+" = "+item.count}}</v-list-item>
                        </v-list>
                        <v-btn @click="getResult(ballot.subBallot[selectedBallot].value.slice(1))">Get Results</v-btn>
                        {{response.data.error || response.data.response}}
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios')

export default {

    props: {
        title: String,
    },
    data() {
        return{
            boothName: this.$route.params.id,
            selectedBallot: 0,
            choice: [this.$route.params.id, []],
            displayChoice: [],
            voterId: "",
            sb: null,
            response: {data: {error: ""}},
            result: []
        }
    },
    computed: {
        
    },
    methods: {
        select(index){
            this.selectedBallot = index
            this.result = []
        },
        getResult(arr){
            for(var i=0; i<arr.length; i++){
                axios.post('https://ws0.herokuapp.com/queryByKey', {
                        "key": arr[i].id
                    }).then( response => {
                        this.result.push(response.data)
                        console.log(response)
                    }).catch( error => {
                        this.response = error
                        console.log(error)
                })
            }
        }
    }
}
</script>

<style lang="css">
    .booth{
        margin: 100px 50px 50px 50px;
        padding: 50px;
        background-color: white;
    }
</style>