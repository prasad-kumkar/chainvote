<template>
<div id="new-ballot">
  <div id="dashboard">
    <h1  style="text-align: center; padding-bottom: 20px">New Election</h1>
    <section>
            <!-- PAGE 1 -->
              <div v-if="this.page==0" id="details">
                <div class="text-fields">
                  <v-text-field style="width: 350px" v-model.trim="ballot.name" label="Title" ></v-text-field>
                  <v-text-field style="width: 350px" v-model.trim="ballot.description" label="Description" ></v-text-field>
                  <v-text-field style="width: 350px" v-model.trim="ballot.organization" label="Organization" ></v-text-field>
                </div>
                <div class="picture">
                  <v-file-input
                    @change="Preview_image"
                    v-model="image"
                    label="Picture"
                    outlined
                    prepend-icon="mdi-camera"
                    style="width: 150px"
                  ></v-file-input>
                  <v-img style=" height: 150px; width: 150px" :src="url"></v-img>
                </div>
              </div>
              
              <!-- PAGE 2 -->
              <div v-if="this.page==1" id="date-time">
                <h2>Select Date and Time</h2>
                <v-row justify="space-around">
                  <v-col>
                    <h3>Start Date:</h3>
                    <v-date-picker 
                      v-model="ballot.startDate">
                    </v-date-picker>
                    <h3>Start Time:</h3>
                    <v-time-picker
                      v-model="ballot.startTime"
                      format="ampm"
                      scrollable
                    ></v-time-picker>
                  </v-col>

                  <v-col>
                      <h3>End Date:</h3>
                  <v-date-picker 
                    v-model="ballot.endDate">
                  </v-date-picker>
                  <h3>End Time:</h3>
                  <v-time-picker
                    v-model="ballot.endTime"
                    format="ampm"
                    scrollable
                    ></v-time-picker>
                  </v-col>
                  
                </v-row>
                <h3 v-if="this.ballot.endDate!='' && this.ballot.startDate!='' && this.ballot.endTime!='' && this.ballot.startTime!=''">
                  {{`Selected Date and Time: ${this.ballot.startDate} at ${this.ballot.startTime} to ${ballot.endDate} at ${this.ballot.endTime}`}}</h3>
              </div>

              <!-- PAGE 3 -->
              <div v-if="this.page==2" id="add-admin">
                <h2>Add Admins</h2>
                <p>Super Admin: {{auth.currentUser.email}}</p>
                <div v-for="(admin, index) in this.ballot.admins" :key="index" class="admin-fields">
                  <v-text-field filled v-model="admin.value" label="Email"></v-text-field>
                  <v-btn v-if="index>=1" style="margin: 10px" @click="removeAdmin(index)" small color="red"><v-icon color="white">mdi-minus</v-icon></v-btn>
                </div>
                <v-btn style="margin: 20px 20px 20px 0px" @click="addAdmin()">Add more admins</v-btn>
              </div>

              <!-- PAGE 4 -->
              <div v-if="this.page==3" id="add-admin">
                <h2>Add Voters</h2>
                <div v-for="(voter, index) in this.ballot.voters" :key="index" class="voter-fields">
                  <v-text-field filled v-model="voter.value" label="Email"></v-text-field>
                  <v-btn style="margin: 10px" @click="removeVoter(index)" small color="red"><v-icon color="white">mdi-minus</v-icon></v-btn>
                </div>
                <v-btn style="margin: 20px 20px 20px 0px" @click="addVoter()">Add more voters</v-btn>
              </div>
              
              <!-- PAGE 5  WIP: Add v-list-->
              <div v-if="this.page==4" id="review">
                <v-list>
                  <h2>Review</h2>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Election Name
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ballot.name}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Organization
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ballot.organization}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Description
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ballot.description}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Start 
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Date: {{ballot.startDate}} 
                        </v-list-item-subtitle><v-list-item-subtitle>
                        Time: {{ballot.startTime}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        End 
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Date: {{ballot.endDate}}
                        </v-list-item-subtitle><v-list-item-subtitle>
                        End: {{ballot.endTime}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content >
                      <v-list-item-title>
                        Election Admins
                      </v-list-item-title>
                      <v-list-item-subtitle v-for="(admin, index) in ballot.admins" :key="index">
                        {{admin.value}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content >
                      <v-list-item-title>
                        Election Voters
                      </v-list-item-title>
                      <v-list-item-subtitle v-for="(voter, index) in ballot.voters" :key="index">
                        {{voter.value}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                </v-list>

              </div>


              <!-- PAGE 6 -->
              <div  v-if="this.page==5" id="sub-ballots">
                <v-row>
                  <v-col>
                    <h2 contenteditable="true">{{ballot.name}}</h2>

                    <div v-for="(subballot, index) in this.subballots" :key="index" class="sub-ballots">
                      <v-btn 
                      large
                      @click="selectSubBallot(index)"
                      >
                        <input 
                        contenteditable="true" 
                        v-model="subballot.value[0]"
                        />
                      </v-btn>

                      <v-btn 
                      style="margin: 10px" 
                      @click="removeSubBallot(index)" 
                      small 
                      color="red"
                      >
                        <v-icon 
                        color="white"
                        >
                        mdi-minus
                        </v-icon>
                        </v-btn>
                    </div>
                    <v-btn style="margin: 10px" @click="newSubBallot()">Add new ballot</v-btn>
                  </v-col>

                  <v-col style="background-color: white" v-if="this.subballots.length>0">
                    <h2>{{this.subballots[this.selectedSubBallot].value[0]}}</h2>
                   
                    <div class="candidates" v-if="this.subballots.length>0">
                      <div v-for="(candidate, index) in this.subballots[this.selectedSubBallot].value.slice(1)" :key="index">
                        <v-chip
                          class="ma-2"
                          color="indigo"
                          text-color="white"
                        >
                          <v-avatar left>
                            <v-icon>mdi-account-circle</v-icon>
                          </v-avatar>
                          <input type="text" v-model="candidate.value" style="color: white">
                        </v-chip>
                     </div>
                     
                    </div>
                    <div class="add-button">
                      <v-btn @click="addCandidates()">Add candidate</v-btn>
                    </div>                    
                  </v-col>
                </v-row>

              </div>

              <!-- END -->
              <div class="buttons">
                <v-btn v-if="this.page!=0" @click="previousPage()" class="btn">Back</v-btn>
                <v-btn v-if="this.page!=5" @click="nextPage()" class="btn">Next</v-btn>
                <v-btn 
                  @click="createBallot()" 
                  v-if="this.page==5"
                  :disabled="ballot.name === ''" 
                  class="btn"
                  >
                  create
                </v-btn>
                <v-btn to="/" class="btn">
                  Go Home
                </v-btn>
              </div>
              

      
    </section>
  </div>
  </div>
</template>


<script>
import {auth} from '../firebase'

export default {
  data: () => {
    return {
      page: 0,
      url: '',
      image: null,
      auth,
      ballot: {
          name: '',
          startDate: '',
          endDate:'',
          startTime: '',
          endTime:'',
          description: '',
          organization: '',
          admins: [{value: auth.currentUser.email}],
          voters: [],
      },
      subballots: [],
      newSubBallotCount: 0, 
      selectedSubBallot: 0
    }
  },
  computed: {
//    ...mapState(['userProfile'])
  },
  methods: {
    createBallot() {
      setTimeout(this.$store.dispatch('createBallot', [this.ballot, this.subballots]), 1000)
      
    },
    nextPage(){
      this.page++
    },
    previousPage(){
      this.page--
    },
    Preview_image() {
      this.url= URL.createObjectURL(this.image)
    },
    addAdmin() {
      this.ballot.admins.push({value: ''})
    },
    removeAdmin(index){
      if(index!=0){
        this.ballot.admins.splice(index,1)
      }
    },
    addVoter() {
      this.ballot.voters.push({value: ''})
    },
    removeVoter(index){
      this.ballot.voters.splice(index,1)
  },
  newSubBallot(){
    this.newSubBallotCount++
    this.subballots.push({value: [`Ballot ${this.newSubBallotCount}`]})
  },
  removeSubBallot(index){
    this.subballots.splice(index,1)
  },
  selectSubBallot(index){
    this.selectedSubBallot = index
  },
  addCandidates(){
    
      this.subballots[this.selectedSubBallot].value.push({value: ''})
    
  }
}
}
</script>

<style lang="css">
#new-ballot{
  display: flex;
  justify-content: center;
}
    #dashboard{
        margin-top: 100px;
        max-width: 1500px;
        padding: 60px;
        padding-top: 5%;
        background-color: #E0F2F1;
    }

    #details{
      display: flex;
      justify-content: space-between;
      background-color: white;
      padding: 20px;
    }
    .admin-fields, .voter-fields{
      display: flex;
    }
    .buttons{
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
      padding-right: 50px;
    }
    .btn{
      margin: 10px;
    }
    #details{
      padding-top: 50px;
      margin-bottom: 20px;
    }
    .sub-ballots{
      padding: 10px;
    }
    h2{
      text-align: center;
      margin: 10px;
    }
    .candidates{
      margin: 10px 25%;
    }
    .add-button{
      display: flex;
      justify-content: center;
    }
</style>