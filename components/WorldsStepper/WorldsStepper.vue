<template>
  <div class="">
    Stepper
    {{ worlds }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Worlds } from '~/store/interfaces'

@Component
export default class WorldsStepper extends Vue {
  @Prop({ required: true }) worlds!: Worlds[]
}
</script>

<style scoped>

</style>
