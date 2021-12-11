<template>
  <div class="">
    <!-- {{ worlds }} -->
    <HorizontalScroller :worlds="worlds" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import HorizontalScroller from './HorizontalScroller.vue'
import { Worlds } from '~/store/interfaces'

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
