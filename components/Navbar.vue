<template>
  <div class="container">
    <NuxtLink to="/">
      Home
    </NuxtLink>
    <NuxtLink to="/levels/1">
      Levels
    </NuxtLink>
    <NuxtLink to="/worlds">
      Worlds
    </NuxtLink>
    <NuxtLink to="/levels/1">
      Levels
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
