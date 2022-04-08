<template>
  <div class="header container">
    <div class="flex">
      <NuxtLink to="/" class="nav-link">
        Home
      </NuxtLink>
      <NuxtLink to="/worlds" class="nav-link">
        Worlds
      </NuxtLink>
      <NuxtLink to="/levels/1" class="nav-link">
        Levels
      </NuxtLink>
    </div>
    <div v-if="!$auth.loggedIn" class="inline-flex">
      <NuxtLink to="/account/login" class="nav-link">
        Login
      </NuxtLink>
      <NuxtLink to="/account/register" class="nav-link register-button">
        Register
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Navbar extends Vue {
}
</script>

<style lang="scss" scoped>
@import "../assets/css/variables";

.header{
  display: flex;
  padding: 8px 0 16px 0px;
  justify-content: space-between;

  .nav-link{
    display: flex;
    align-items: center;

    padding: 0 8px;
    color: #fff;
  }
  .nav-link:first-child {
    padding: 0 16px 0 0;
  }

  .register-button{
    padding: 8px 16px;
    background-color: white;
    border-radius: 4px;
    color: $blue;
  }

  a{
    text-decoration: none;
  }
}
</style>
