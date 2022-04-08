<template>
  <div>
    <h1>Register</h1>
    <form class="wizmi-form" @submit.prevent="register">
      <div class="wizmi-form-group">
        <label class="wizmi-label" for="username">Username</label>
        <input v-model="user.username" type="text" name="username" placeholder="Wizmi">
      </div>

      <div class="wizmi-form-group">
        <label class="wizmi-label" for="email">Email</label>
        <input v-model="user.email" type="text" name="email" placeholder="wizmi@gmail.com">
      </div>

      <div class="wizmi-form-group">
        <label class="wizmi-label" for="password">Password</label>
        <input v-model="user.password" type="password" name="password">
      </div>

      <div class="wizmi-form-group">
        <label class="wizmi-label" for="passwordVerify">Confirm password</label>
        <input v-model="user.passwordVerify" type="password" name="passwordVerify">
      </div>

      <button class="wizmi-button-primary">
        LETS GOOOO
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { RegisterUserInput } from 'wizmi'

@Component({
  middleware: ['auth'],
  auth: 'guest'
})
export default class RegisterPage extends Vue {
  user = {
    username: '',
    email: '',
    password: '',
    passwordVerify: ''
  }

  layout () {
    return 'base'
  }

  async register () {
    const registerInput: RegisterUserInput = { ...this.user }
    try {
      await this.$api.auth.register(registerInput)
      this.$router.push('/account/login')
    } catch {
      this.user.email = ''
      this.user.username = ''
      this.user.password = ''
      this.user.passwordVerify = ''
    }
  }
}

</script>
