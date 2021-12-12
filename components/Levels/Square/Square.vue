<template>
  <div class="wizmi-level-square">
      square
      
  </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue } from 'nuxt-property-decorator'
import { Levels } from '~/store/interfaces'

@Component
export default class Square extends Vue {
    @InjectReactive() level!: Levels
}
</script>

<style lang="scss" scoped>

</style>
