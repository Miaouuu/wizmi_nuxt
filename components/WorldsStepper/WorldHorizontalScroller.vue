<template>
  <div id="scroll" class="wizmi-horizontal-scroller-container">
    <template v-if="worlds[worldIndex]">
      <a
        v-for="(level, levelIndex) in worlds[worldIndex].levels"
        :key="levelIndex"
        :href="`/levels/${level.id}`"
        class="level-item"
        :class="{ 'small-item' : levelIndex > 0 }"
      >
        <div
          :id="`w-${worldIndex + 1}-l-${levelIndex + 1}`"
          class="relative wizmi-worlds-item"
          :class="{
            'active' : levelIndex === selectedLevel && worldIndex === selectedWorld,
            'previous-active' : levelIndex === (selectedLevel - 1) && worldIndex === selectedWorld,
          }"
        >
          <img v-if="levelIndex === 0" src="../../assets/images/w-1-l-1.png" :alt="`Level ${levelIndex + 1} from world ${worldIndex + 1}`">
          <img v-if="levelIndex === 1" src="../../assets/images/w-1-l-2.png" :alt="`Level ${levelIndex + 1} from world ${worldIndex + 1}`">
          <img v-if="levelIndex === 2" src="../../assets/images/w-1-l-3.png" :alt="`Level ${levelIndex + 1} from world ${worldIndex + 1}`">
          <img v-if="levelIndex === 3" src="../../assets/images/w-1-l-4.png" :alt="`Level ${levelIndex + 1} from world ${worldIndex + 1}`">
          <div class="absolute level-name">
            <p>{{ level.name }}</p>
            <span>{{ (worldIndex + 1) + " - " + (levelIndex + 1) }}</span>
          </div>
        </div>
      </a>
    </template>
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
  worldIndex: number = 0

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
@import "../../assets/css/variables";

.wizmi-horizontal-scroller-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  width: 100%;
  height: 100%;
}

.level-item{
  position: relative;

  &:before{
    content: "";
    position: absolute;
    bottom: -69px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #F2B138;
    border: 5px solid $light-blue;
    z-index: 10;
    cursor: auto;
  }

  &:not(:last-child):after {
    content: "";

    position: absolute;
    bottom: -50px;
    left: 50%;
    width: 100%;
    height: 2px;
    border-top: 1px dashed #fff;
  }
}

.small-item {
  &:before{
    bottom: -120px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 24px;
    height: 24px;
    background-color: #fff;
  }
  &:not(:last-child):after {
    bottom: -106px;
    width: calc(100% + 4rem);
  }
}

.level-name{
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  p{
    margin: 0;
  }
  span{
    display: flex;
    justify-content: flex-end;
    width: 100%;
    font-size: 0.9rem;
    color: #F2B138;
  }
}
// .wizmi-horizontal-scroller-container{
//   overflow-x: auto;
//   width: auto;
// }
// .wizmi-horizontal-scroller{
//     display: grid;
//     grid-auto-flow: column;

//     width: auto
// }

// .wizmi-worlds{
//   display: grid;
//   grid-auto-flow: column;
//   position: relative;

//   margin-right: 16px;

//   // TODO : Pas beau
//   // Targets every stepper dash between worlds
//   &:not(:last-child):after {
//     content: "";

//     position: absolute;
//     bottom: 50px;
//     left: 16%;
//     width: calc(100% + 100px);
//     height: 0px;
//     border-bottom: 2px dashed #ccc;
//     z-index: -1;
//   }

//   .wizmi-worlds-item{
//     display: flex;
//     position: relative;
//     justify-content: center;
//     align-items: center;
//     align-self: flex-end;

//     width: 20vh;
//     height: 20vh;
//     margin: 0 10vh 96px 10vh;

//     border: 4px solid black;

//     transition: all 0.3ms ease-in-out;
//     cursor: pointer;

//     // Targets every level step point
//     &:before{
//       content: "";

//       position: absolute;
//       bottom: -61px;

//       width: 24px;
//       height: 24px;

//       border-radius: 50%;
//       background-color: black;

//       cursor: auto;
//     }

//     // Targets every stepper dash
//     &:after{
//       cursor: auto;
//     }

//     // Targets every stepper dash that is not link to the last level of a world
//     &:not(:last-child):after {
//       content: "";

//       position: absolute;
//       bottom: -50px;
//       left: 50%;
//       width: 200%;
//       height: 2px;
//       background-color: black;
//     }
//   }

//   // Selected level
//   .active{
//     width: 40vh;
//     height: 40vh;

//     // Targets the step point with class .active
//     &:before{
//       bottom: -72px;
//       width: 48px;
//       height: 48px;
//     }

//     // Targets the stepper dash with class .active if it's not the last level in the world
//     &:not(:last-child):after{
//       width: calc(100% + 10vh);
//     }
//   }

//   .previous-active{
//     &:not(:last-child):after{
//       width: calc(200% + 10vh);
//     }
//   }

//   // Targets the dash from .active class only if it's the world last level
//   .active:last-child:after{
//     content: "";

//     position: absolute;
//     bottom: -50px;
//     right: 50%;
//     width: 100%;
//     height: 2px;
//     background-color: black;
//   }
// }
</style>
