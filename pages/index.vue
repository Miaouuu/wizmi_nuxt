<template>
  <div>
    <div>{{ $t("message") }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {
  layout () {
    return 'wizmi-base'
  }
}
</script>
