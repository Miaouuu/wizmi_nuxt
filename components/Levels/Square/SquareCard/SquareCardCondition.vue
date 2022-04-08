<template>
  <div>
    <p class="m-0">
      if {{ condition.condition }}
    </p>
    <p class="m-0">
      do {{ condition.action }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Condition } from 'wizmi'

@Component
export default class SquareCardCondition extends Vue {
  @Prop() condition!: Condition
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
