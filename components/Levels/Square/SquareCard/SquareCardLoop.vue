<template>
  <div class="card">
    <div class="card-replay">
      Boucler {{ loop.condition }} fois
    </div>
    <div class="flex absolute gap-1">
      {{ loop.block }}
      <img src="@/assets/icons/copy.svg" alt="arrow pointing right" style="height: 11px; width: 11px;">
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
  margin-bottom: 4px;
  gap: 2px;
  width: fit-content;
  height: 24px;
  color: #fff;

  img {
    height: 20px;
    width: 20px;
  }
}

.gap-1 {
  gap: 0.25px;
}

.absolute {
  align-items: baseline;
  bottom: 4px;
  right: 4px;
  color: #fff;
}
</style>
