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
            'active' : levelIndex === selectedLevel && worldIndex === selectedWorld,
            'previous-active' : levelIndex === (selectedLevel - 1) && worldIndex === selectedWorld
          }"
        >
          <a :href="`/levels/${level.id}`" class="full-width-link" />
          {{ world.name }}<br>{{ level.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Worlds } from 'wizmi'

@Component
export default class HorizontalScroller extends Vue {
  selectedLevel: number = 0
  selectedWorld: number = 0
  oldDelta: number = 0

  @Prop({ required: true }) worlds!: Worlds[]

  mounted () {
    const element = document.documentElement
    element.addEventListener('wheel', this.transformScroll)
  }

  transformScroll (event: WheelEvent) {
    this.oldDelta += event.deltaY
    if (this.oldDelta < -500) {
      this.changeSelectedElement(-1)
    } else if (this.oldDelta > 500) {
      this.changeSelectedElement(1)
    }
  }

  changeSelectedElement (upOrDown: number) {
    let tempLevel = this.selectedLevel
    tempLevel += upOrDown
    if (tempLevel > this.worlds[this.selectedWorld].levels.length - 1) {
      if (this.worlds[this.selectedWorld + 1]) {
        this.selectedWorld++
        this.selectedLevel = 0
      }
    } else if (tempLevel < 0) {
      if (this.worlds[this.selectedWorld - 1]) {
        this.selectedWorld--
        this.selectedLevel = this.worlds[this.selectedWorld].levels.length - 1
      }
    } else {
      this.selectedLevel = tempLevel
    }

    const world = document.getElementById(`w-${this.selectedWorld}`)
    world?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start'
    })
    const level = document.getElementById(`w-${this.selectedWorld}-l-${this.selectedLevel}`)
    level?.scrollIntoView({
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
