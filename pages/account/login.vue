<template>
  <div>
    <h1>Login</h1>
    <form class="wizmi-form">
      <div class="wizmi-form-group">
        <label class="wizmi-label" for="username">Email</label>
        <input v-model="user.email" type="text" name="email">
      </div>

      <div class="wizmi-form-group">
        <label class="wizmi-label" for="password">Password</label>
        <input v-model="user.password" type="password" name="password">
      </div>

      <button class="wizmi-button-primary" @click="submitForm()">
        LETS GOOOO
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

// TODO : CLEAN
enum NotificationTypes{
  Error = 'error'
}

interface Notification{
  type: NotificationTypes,
  message: string
}

export default Vue.extend({
  name: 'LoginPage',
  layout: 'wizmi-base',
  props: { },
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      notifications: {
        email: {} as Notification
      }
    }
  },

  methods: {
    validateEmail () {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)) {
        return true
      } else {
        const notif: Notification = {
          type: NotificationTypes.Error,
          message: 'Please enter a valid email address'
        }
        this.notifications.email = notif
        return false
      }
    },
    submitForm () {
      if (this.validateEmail()) {
        console.log(this.user)
      } else {
        console.log(this.notifications)
      }
    }
  }
})
</script>
