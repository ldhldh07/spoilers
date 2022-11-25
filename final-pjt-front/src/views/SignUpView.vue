<template>
  <div class="d-flex flex-column align-items-center">
    <h3>회원가입</h3>
    <form @submit.prevent="signUp">
      <label class="form-label" for="username">username : </label>
      <input class="form-control" type="text" id="username" v-model="username"><br>
      
      <label class="form-label" for="username">email : </label>
      <input class="form-control" type="email" id="email" v-model="email"><br>

      <label class="form-label" for="password1"> password : </label>
      <input class="form-control" type="password" id="password1" v-model="password1"><br>

      <label class="form-label" for="password2"> password confirmation : </label>
      <input class="form-control" type="password" id="password2" v-model="password2"><br>
      <input class="btn btn-warning" type="submit" value="SignUp">
    </form>
    <b-modal ref="signup" hide-footer hide-header-close title="회원가입 실패">
      <p class="my-4">{{ modalMessage }}</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      email: null,
      password1: null,
      password2: null,
    }
  },
  computed: {
    modalMessage() {
      return this.$store.state.modalMessage
    }
  },  
  methods: {
    signUp() {
      const username = this.username
      const email = this.email
      const password1 = this.password1
      const password2 = this.password2
      const next = this.$route.query.next

      const payload = {
        username,
        email,
        password1,
        password2,
        next,
      }
      this.$store.dispatch('signUp', payload)
      setTimeout(() => {
        if(this.modalMessage) {
          this.$refs['signup'].show()
          setTimeout(() => {
            this.$refs['signup'].hide()
            this.$store.commit('RESET_MODAL_MESSAGE')
          },1000)
        }
      }, 100)
    },
    unmounted() {
      this.$store.commit('RESET_MODAL_MESSAGE')
    }
  }
}
</script>
