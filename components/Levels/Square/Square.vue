<template>
  <div class="flex flex-column">
    <div class="flex flex-row h-100">
      <div class="flex flex-column wizmi-level-aside">
        <div class="wizmi-level-info">
          <p>{{ level.worldId }} - {{ level.id }}</p>
          <p>{{ level.name }}</p>
        </div>
        <draggable
          v-model="cardOptions"
          :animation="200"
          ghost-class="ghost-card"
          group="options"
          class="wizmi-level-options"
        >
          <transition-group name="options">
            <div v-for="card in cardOptions" :key="card.id" class="wizmi-square-card">
              {{ card.value }}
            </div>
          </transition-group>
        </draggable>
      </div>

      <div class="flex flex-column wizmi-level-playable-area">
        <div class="wizmi-level-timeline">
          <draggable
            v-model="cardChosen"
            :animation="200"
            ghost-class="ghost-card"
            group="options"
            class="wizmi-timeline-draggable"
          >
            <transition-group name="timeline">
              <div v-for="card in cardChosen" :key="card.id" class="wizmi-square-card">
                {{ card.value }}
              </div>
            </transition-group>
          </draggable>

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
import draggable from 'vuedraggable'
import { Levels } from '~/store/interfaces'

@Component({
  components: {
    draggable
  }
})
export default class Square extends Vue {
  @InjectReactive() level!: Levels
  @Provide() play: boolean = false
  @Provide() cardChosen: Array<any> = [
    {
      id: 1,
      value: 3,
      direction: 'right'
    },
    {
      id: 2,
      value: 4,
      direction: 'left'
    }
  ]

  @Provide() cardOptions: Array<any> = [
    {
      id: 3,
      value: 1,
      direction: 'up'
    },
    {
      id: 4,
      value: 2,
      direction: 'down'
    }
  ]

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

      span{
        display: flex;
        flex-wrap: wrap;

        width: 100%;
        gap: 16px;
      }
  }
}

.wizmi-level-playable-area{
  flex-grow: 1;
  margin-left: $margin;

  .wizmi-level-timeline{
    position: relative;
    height: $topElementsHeight;
    margin-bottom: $margin;

    .wizmi-timeline-draggable{
      display: flex;
      flex-direction: row;
      height: 100%;
      width: 100%;

      span{
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }
    }
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

.wizmi-square-card{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  width: 50px;
  background-color: rgb(255, 210, 88);
}

</style>
