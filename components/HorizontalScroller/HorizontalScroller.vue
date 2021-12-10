<template>
  <div class="wizmi-horizontal-scroller-container">
    <div class="wizmi-horizontal-scroller">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class HorizontalScroller extends Vue {
}
</script>

<style lang="scss" scoped>

.wizmi-horizontal-scroller-container{
  max-width: 100%;
  overflow-x: auto;

}
.wizmi-horizontal-scroller{
    background-color: #ccc;
    display: flex;
    min-width: 200vw
}
</style>
