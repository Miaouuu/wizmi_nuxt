<template>
  <div class="flex justify-center w-12 h-12">
    <img class="w-100 h-100" src="@/assets/icons/door.svg" alt="door">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class SquareDoor extends Vue {
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
