<template>
    <div class="aligned center aligned grid mt-5">
        <div class="home">
          <v-row>
            <v-card max-height="60%" class="mx-auto my-auto pa-10" width="600px" elevation="12">
                <v-card-title primary-title> <h4 class="text-xs-center mx-auto my-auto" id="v-step-0">To Step In.. </h4></v-card-title>
                <v-form>
                <v-text-field prepend-icon="mdi-account" label="Username" v-model="loginForm.email" id="v-step-1"></v-text-field>
                <v-text-field prepend-icon="mdi-lock" label="Password" type="password" v-model="loginForm.password" id="v-step-2" @keyup.enter="login()"></v-text-field>
                <!-- <v-switch v-model="form.admin" label="are you a developer?"></v-switch> -->
                <v-card-actions><v-btn primary large block @click="login()" id="v-step-3">Enter</v-btn></v-card-actions>
                </v-form>
                <v-card-actions>
                  <a href="">Forget Password ?</a>
                </v-card-actions>
            </v-card>
          </v-row>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    }
  }
}
</script>
