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
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile ({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      commit('setUserProfile', userProfile.data())
      if (router.currentRoute.path === '/login') router.push('/')
    },
    async signup (form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      await fb.usersCollection.doc(user.uid).set({
        email: form.email,
        role: form.role,
        phone: form.phone,
        profile: form.profile,
        name: form.name
      })
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
