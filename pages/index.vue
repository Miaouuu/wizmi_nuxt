<template>
  <div class="container">
    <div>{{ $t("message") }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {
  layout () {
    return 'base'
  }
}
</script>
