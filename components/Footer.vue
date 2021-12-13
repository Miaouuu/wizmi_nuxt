<template>
  <div class="footer">
    <div class="container" />
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
    margin: auto 0 16px 0;
  }
</style>
