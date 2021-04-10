<template>
  <div id="dashboard" class="pt-5">
     <section>
      <v-row >
        <v-col cols="12">
          <v-card>
          <v-row>
              <v-col cols="4">
              <v-img height="250" ></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title> {{userProfile.name}}</v-card-title>
              <v-card-subtitle class="pt-3">Email    :{{userProfile.email}} </v-card-subtitle>
              <v-card-subtitle>Phone No :{{userProfile.phoneno}} </v-card-subtitle>
              <v-card-subtitle>Role : {{userProfile.role}}</v-card-subtitle>
            </v-col>
          </v-row>
        </v-card>
        </v-col>
      </v-row>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      post: {
        content: ''
      }
    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    createPost () {
      this.$store.dispatch('createPost', { content: this.post.content })
      this.post.content = ''
    }
  }
}
</script>
