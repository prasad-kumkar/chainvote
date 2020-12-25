<template>
    <div class="booth">
        <div v-for="(ballot, index) in this.$store.state.ballots" :key="index">
            <div v-if="ballot.ballot.name==boothName" >
                <p hidden>{{sb = ballot.subBallot}} </p>
                {{ballot}}
                <h1>{{ballot.ballot.name}}</h1>
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
                        <div>
                            <v-radio-group v-model="choice[1][selectedBallot]">
                            <div v-for="(c, i) in ballot.subBallot[selectedBallot].value" :key="i" >
                                <v-radio v-if="i>0" :label="c.value" :value="c.id">
                                </v-radio>
                            </div>
                        </v-radio-group>
                        </div>
                        <p>Voting for {{choice[0]}}. Selected Candidates: {{choice[1] || null}}</p>
                        <v-text-field label="Voter ID" v-model.trim="voterId"></v-text-field>
                        <v-btn @click="castVote()" v-bind:disabled="hasVoted">Vote</v-btn>
                        {{response.data.error || "Voted Successfully"}}
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
            hasVoted: false
        }
    },
    computed: {

    },
    methods: {
        select(index){
            this.selectedBallot = index
        },
        castVote(){
            for(var i=0; i<this.choice[1].length; i++){

                axios.post('https://ws0.herokuapp.com/castBallot', {
                        "voterId": this.voterId,
                        "electionId": this.sb[i].id,
                        "picked": this.choice[1][i]
                    }).then( response => {
                    this.response = response
                    console.log(response)
                    }).catch( error => {
                    this.response = error
                    console.log(error)
                })
            }
            this.hasVoted = true
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