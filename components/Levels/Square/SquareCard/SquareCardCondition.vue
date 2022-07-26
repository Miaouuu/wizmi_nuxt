<template>
  <div class="card">
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
.card {
  color: #fff;
  font-weight: 700;
}
</style>
