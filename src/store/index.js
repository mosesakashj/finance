import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {}
  },
  mutations: {
    setUserProfile (state, val) {
      state.userProfile = val
    }
  },
  actions: {
    async login ({ dispatch }, form) {
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      console.log(user.uid)
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile ({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      commit('setUserProfile', userProfile.data())
      if (router.currentRoute.path === '/login') router.push('/')
    },
    async signup (state, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      form.uid = user.uid
      await fb.usersCollection.doc(user.uid).set(form)
    },
    async logout ({ commit }) {
      await fb.auth.signOut()
      commit('setUserProfile', {})
      router.push('/login')
    }
  },
  modules: {
  }
})
