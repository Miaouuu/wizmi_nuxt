<template>
  <div class="flex flex-column">
    <div class="flex flex-row h-100">
      <div class="flex flex-column wizmi-level-aside">
        <div class="wizmi-level-info">
          <p>{{ level.worldId }} - {{ level.id }}</p>
          <p>{{ level.name }}</p>
        </div>
        <div class="wizmi-level-options">
          aside
        </div>
      </div>
      <div class="flex flex-column wizmi-level-playable-area">
        <div class="wizmi-level-timeline">
          timeline
          <div class="play" @click="togglePlay()">
            <img v-if="play === false" src="~/assets/icons/play-solid.svg">
            <img v-if="play === true" src="~/assets/icons/pause-solid.svg">
          </div>
          <div class="trash" @click="resetTimeline()">
            <img src="~/assets/icons/trash-alt-solid.svg">
          </div>
        </div>
        <div class="wizmi-level-game-area">
          game-area
          {{ level }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Provide, Vue } from 'nuxt-property-decorator'
import { Levels } from '~/store/interfaces'

@Component
export default class Square extends Vue {
  @InjectReactive() level!: Levels
  @Provide() play: boolean = false

  resetTimeline () {
    return true
  }

  togglePlay () {
    this.play = !this.play
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/variables";

$margin: 16px;
$topElementsHeight: 20%;

// TODO? : Move to global css ?
.wizmi-level-info, .wizmi-level-options, .wizmi-level-timeline, .wizmi-level-game-area{
  border: 2px solid $blue;
  border-radius: 8px;
}
.wizmi-level-aside{
  flex-grow: 1;
  width: 25%;

  .wizmi-level-info{
    height: $topElementsHeight;
    margin-bottom: $margin;
  }
  .wizmi-level-options{
    display: flex;
    flex-grow: 1;
  }
}

.wizmi-level-playable-area{
  flex-grow: 1;
  margin-left: $margin;

  .wizmi-level-timeline{
    position: relative;
    height: $topElementsHeight;
    margin-bottom: $margin;

    .play, .trash{
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 0;

      height: 48px;
      width: 48px;

      border-top: 2px solid $blue;
      border-left: 2px solid $blue;

      cursor: pointer;
    }
    .play{
      right: 48px;
    }
    .trash{
      right: 0;
    }
    img{
      height: 24px;
      width: 24px;

      fill: $blue;
    }
  }
  .wizmi-level-game-area{
    display: flex;
    flex-grow: 1;
  }
}

</style>
