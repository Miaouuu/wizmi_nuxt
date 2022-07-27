<template>
  <div>
    <h1>Login</h1>
    <form class="wizmi-form" @submit.prevent="login">
      <div class="wizmi-form-group">
        <label class="wizmi-label" for="username">Email</label>
        <input v-model="user.email" type="text" name="email">
      </div>

      <div class="wizmi-form-group">
        <label class="wizmi-label" for="password">Password</label>
        <input v-model="user.password" type="password" name="password">
      </div>

      <button class="wizmi-button-primary">
        LETS GOOOO
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  middleware: ['auth'],
  auth: 'guest'
})
export default class LoginPage extends Vue {
  user = {
    email: '',
    password: ''
  }

  layout () {
    return 'base'
  }

  async login () {
    try {
      await this.$auth.loginWith('local', { data: this.user })
    } catch {
      this.user.email = ''
      this.user.password = ''
    }
  }
}
</script>
