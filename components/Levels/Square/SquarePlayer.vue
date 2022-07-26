<template>
  <div class="flex justify-center w-12 h-12">
    <img src="@/assets/icons/player.svg" alt="person">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class SquarePlayer extends Vue {
}
</script>

<style lang="scss" scoped>
.w-12 {
  width: 3rem;
}
.h-12 {
  height: 3rem;
}
</style>
