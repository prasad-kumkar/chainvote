<template>
    <div class="booth">
        <div v-for="(ballot, index) in this.$store.state.ballots" :key="index">
            <div v-if="ballot.ballot.name==boothName" >
                {{ballot.ballot.name}}
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
            boothName: this.$route.params.id
        }
    },
    computed: {
        
    }
}
</script>

<style lang="css">
    .booth{
        margin: 100px 50px 50px 50px;
    }
</style>