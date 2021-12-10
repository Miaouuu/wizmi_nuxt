<template>
  <div class="">
    Stepper
    {{ worlds }}
    <HorizontalScroller>
      <div class="block">block</div>
      <div class="block">block</div>
      <div class="block">block</div>
      <div class="block">block</div>
      <div class="block">block</div>
      <div class="block">block</div>
    </HorizontalScroller>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import HorizontalScroller from '../HorizontalScroller/HorizontalScroller.vue'
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
.block{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  border: 2px solid black;
  background-color: bisque;
}
</style>
