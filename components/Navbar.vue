<template>
  <div class="container">
    <NuxtLink to="/">
      Home page
    </NuxtLink>
    <NuxtLink to="/worlds">
      Worlds
    </NuxtLink>
    <NuxtLink to="/account/login">
      Login
    </NuxtLink>
    <NuxtLink to="/account/register">
      Register
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Navbar extends Vue {

}
</script>

<style scoped>

</style>
