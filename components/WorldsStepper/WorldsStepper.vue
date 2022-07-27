<template>
  <div class="">
    <!-- {{ worlds }} -->
    <HorizontalScroller :worlds="worlds" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Worlds } from 'wizmi'
import HorizontalScroller from './HorizontalScroller.vue'

@Component({
  components: {
    HorizontalScroller
  }
})

export default class WorldsStepper extends Vue {
  @Prop({ required: true }) worlds!: Worlds[]
}
</script>

<style scoped>

</style>
