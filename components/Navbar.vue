<template>
  <div class="container">
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/worlds">Worlds</NuxtLink>
    <NuxtLink to="/levels/">Levels</NuxtLink>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Navbar extends Vue{
  
}
</script>

<style scoped>

</style>
