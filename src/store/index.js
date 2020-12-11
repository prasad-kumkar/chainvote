import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

fb.ballotsCollection.orderBy('createdOn').onSnapshot(snapshot => {
  let ballotsArray = []

  snapshot.forEach(doc => {
    let ballot = doc.data()
    ballot.id = doc.id

    ballotsArray.push(ballot)
  })

  store.commit('setBallots', ballotsArray)
})

const store = new Vuex.Store({
  state: {
    userProfile: {},
    ballots: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setBallots(state, val) {
      state.ballots = val
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      // set user profile in state
      commit('setUserProfile', userProfile.data())
      
    
      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async signup({ dispatch }, form) {
        // sign user up
        const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      
        // create user profile object in userCollections
        await fb.usersCollection.doc(user.uid).set({
          name: form.name,
          phone: form.phone
        })
      
        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
      },
      async logout({ commit }) {
        await fb.auth.signOut()
      
        // clear userProfile and redirect to /login
        commit('setUserProfile', {})
        router.push('/login')
      },
    async createBallot({state}, ballot) {
      console.log(ballot)
      await fb.ballotsCollection.doc(ballot[0].name).set({
        createdOn: new Date(),
        ballot: ballot[0],
        subBallot: ballot[1],
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
      })
    }
  }
})

export default store