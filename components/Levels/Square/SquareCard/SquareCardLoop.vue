<template>
  <div class="card">
    <div class="card-replay">
      <img src="@/assets/icons/repeat.svg" alt="replay">
      {{ loop.condition }}
    </div>
    <div class="flex absolute">
      {{ loop.block }}
      <img src="@/assets/icons/arrow-right.svg" alt="arrow pointing right" style="height: 10px; width: 10px;">
    </div>
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
  display: flex;
  align-items: baseline;
  gap: 2px;
  width: 24px;
  height: 24px;
  color: #fff;

  img {
    height: 20px;
    width: 20px;
  }
}

.absolute {
  align-items: baseline;
  bottom: 4px;
  right: 4px;
  color: #fff;
}
</style>
