<template>
  <div>
    <div class="card-replay">
      <img src="@/assets/icons/repeat.svg" alt="replay">
    </div>
    <p class="m-0">
      {{ loop.condition }}
    </p>
    <p class="m-0">
      {{ loop.block }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Loop } from 'wizmi'

@Component
export default class SquareCardLoop extends Vue {
  @Prop() loop!: Loop
}
</script>

<style lang="scss" scoped>
.card-replay{
  width: 24px;
  height: 24px;

  img {
    height: 24px;
    width: 24px;
  }
}
</style>
