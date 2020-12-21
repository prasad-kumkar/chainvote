<template>
    <div class="booth">
        <div v-for="(ballot, index) in this.$store.state.ballots" :key="index">
            <div v-if="ballot.ballot.name==boothName" >
                <h1>{{ballot.ballot.name}}</h1>
                <p>{{ballot.ballot.description}} 
                    </p><p>
                    by {{ballot.ballot.organization}}</p>
                <v-row>
                    <v-col>
                        <v-row v-for="(b, i) in ballot.subBallot" :key="i">
                           <v-btn style="margin: 10px" @click="select(i)">
                               {{b.value[0]}}
                               </v-btn> 
                        </v-row>
                    </v-col>
                    <v-col>
                        <h2>{{ballot.subBallot[selectedBallot].value[0]}}</h2>
                        <div>
                            <v-radio-group >
                            <div v-for="(c, i) in ballot.subBallot[selectedBallot].value" :key="i">
                                <v-radio v-if="i>0" :label="c.value" :value="c.value">
                                </v-radio>
                            </div>
                        </v-radio-group>
                        </div>
                        <v-btn>Vote</v-btn>
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        title: String
    },
    data() {
        return{
            boothName: this.$route.params.id,
            selectedBallot: 0
        }
    },
    computed: {
    },
    methods: {
        select(index){
            this.selectedBallot = index
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