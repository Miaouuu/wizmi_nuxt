<template>
  <div class="footer container">
    Footer
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Footer extends Vue {
}

</script>

<style scoped>
  .footer{
    display: flex;
    margin-top: auto;
  }
</style>
