<template>
  <div class="wizmi-horizontal-scroller-container">
    <div id="scroll" class="wizmi-horizontal-scroller">
      <div v-for="(i, index) in 8" :id="`t-${index}`" :key="index" class="block">
        {{ index === selected ? selected : 'block' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class HorizontalScroller extends Vue {
  selected: number = 0
  oldDelta: number = 0

  mounted () {
    const element = document.documentElement
    element.addEventListener('wheel', this.transformScroll)
  }

  transformScroll (event: WheelEvent) {
    this.oldDelta += event.deltaY
    console.log(this.oldDelta)

    if (this.oldDelta < -500) {
      this.changeSelectedElement(-1)
      console.log('UP')
    } else if (this.oldDelta > 500) {
      console.log('Down')
      this.changeSelectedElement(1)
    }
  }

  changeSelectedElement (i: number) {
    let temp = this.selected
    temp += i
    temp = temp < 0 ? 0 : temp
    temp = temp > 7 ? 7 : temp
    this.selected = temp
    const c = document.getElementById(`t-${this.selected}`)
    c?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center'
    })
    this.oldDelta = 0
  }
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

.block{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  border: 2px solid black;
  background-color: bisque;
  margin-right: 64px;
}
</style>
