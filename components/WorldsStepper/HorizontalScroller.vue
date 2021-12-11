<template>
  <div class="wizmi-horizontal-scroller-container">
    <div id="scroll" class="wizmi-horizontal-scroller">
      <div
        v-for="(i, index) in 8"
        :id="`t-${index}`"
        :key="index"
        class="wizmi-worlds-item"
        :class="index === selected ? 'active' : '' "
      >
        {{ index === selected ? selected : 'not-selected' }}
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
      inline: 'start'
    })
    this.oldDelta = 0
  }
}
</script>

<style lang="scss" scoped>

.wizmi-horizontal-scroller-container{
  overflow-x: auto;

  width: auto;
}
.wizmi-horizontal-scroller{
    display: grid;
    grid-auto-flow: column;

    width: auto
}

.wizmi-worlds-item{
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  width: 20vh;
  height: 20vh;
  margin: 0 10vh 100px 10vh;

  border: 3px solid black;

  transition: all 0.3ms ease-in-out;

  &:before{
    content: "";

    position: absolute;
    bottom: -64px;

    width: 30px;
    height: 30px;

    border-radius: 50%;
    background-color: black;
  }

  &:not(:last-child):after {
    content: "";

    position: absolute;
    bottom: -50px;
    left: 50%;
    width: 200%;
    height: 2px;
    background-color: black;
  }
}

.wizmi-worlds-item.active{
  width: 40vh;
  height: 40vh;

    &:before{
    bottom: -75px;
    width: 50px;
    height: 50px;
  }

  &:not(:last-child):after {
    bottom: -50px;
  }
}
</style>
