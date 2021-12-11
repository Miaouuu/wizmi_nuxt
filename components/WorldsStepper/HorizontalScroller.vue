<template>
  <div class="wizmi-horizontal-scroller-container">
    <div id="scroll" class="wizmi-horizontal-scroller">
      <div
        v-for="(world, worldIndex) in worlds"
        :id="`w-${worldIndex}`"
        :key="worldIndex"
        class="wizmi-worlds"
      >
        <h2>{{ worldIndex + 1 }}</h2>
        <div
          v-for="(level, levelIndex) in world.levels"
          :id="`w-${worldIndex}-l-${levelIndex}`"
          :key="levelIndex"
          class="wizmi-worlds-item"
          :class="{
            'active' : (level.id - 1) === selected,
            'previous-active' : level.id === selected
          }"
        >
          {{ world.name }}<br>{{ level.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Worlds } from '~/store/interfaces'

@Component
export default class HorizontalScroller extends Vue {
  selected: number = 0
  oldDelta: number = 0

    @Prop({ required: true }) worlds!: Worlds[]

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
      const c = document.getElementById(`w-${this.selected}`)
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
  overflow-x: auto;

  width: auto;
}
.wizmi-horizontal-scroller{
    display: grid;
    grid-auto-flow: column;

    width: auto
}

.wizmi-worlds{
  display: grid;
  grid-auto-flow: column;
  position: relative;

  margin-right: 16px;

  // TODO : Pas beau
  // Targets every stepper dash between worlds
  &:not(:last-child):after {
    content: "";

    position: absolute;
    bottom: 50px;
    left: 16%;
    width: calc(100% + 100px);
    height: 0px;
    border-bottom: 2px dashed #ccc;
    z-index: -1;
  }

  .wizmi-worlds-item{
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    align-self: flex-end;

    width: 20vh;
    height: 20vh;
    margin: 0 10vh 96px 10vh;

    border: 4px solid black;

    transition: all 0.3ms ease-in-out;
    cursor: pointer;

    // Targets every level step point
    &:before{
      content: "";

      position: absolute;
      bottom: -61px;

      width: 24px;
      height: 24px;

      border-radius: 50%;
      background-color: black;

      cursor: auto;
    }

    // Targets every stepper dash
    &:after{
      cursor: auto;
    }

    // Targets every stepper dash that is not link to the last level of a world
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

  // Selected level
  .active{
    width: 40vh;
    height: 40vh;

    // Targets the step point with class .active
    &:before{
      bottom: -72px;
      width: 48px;
      height: 48px;
    }

    // Targets the stepper dash with class .active if it's not the last level in the world
    &:not(:last-child):after{
      width: calc(100% + 10vh);
    }
  }

  .previous-active{
    &:not(:last-child):after{
      width: calc(200% + 10vh);
    }
  }

  // Targets the dash from .active class only if it's the world last level
  .active:last-child:after{
    content: "";

    position: absolute;
    bottom: -50px;
    right: 50%;
    width: 100%;
    height: 2px;
    background-color: black;
  }
}
</style>
