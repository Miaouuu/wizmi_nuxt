<template>
  <div>
    <div v-if="movement.direction" class="card-arrow">
      <img :src="require(`@/assets/icons/arrow-${movement.direction}.svg`)" :alt="'arrow pointing ' + movement.direction">
    </div>
    <p class="m-0">
      {{ movement.quantity }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Movement } from 'wizmi'

@Component
export default class SquareCardMovement extends Vue {
  @Prop() movement!: Movement
}
</script>

<style lang="scss" scoped>
.card-arrow{
  width: 24px;
  height: 24px;

  img {
    height: 24px;
    width: 24px;
  }
}
</style>
