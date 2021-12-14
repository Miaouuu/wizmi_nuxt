<template>
  <div class="flex flex-column">
    <div class="flex flex-row h-100">
      <div class="flex flex-column wizmi-level-aside">
        <div class="wizmi-level-info">
          <p>{{ level.worldId }} - {{ level.id }}</p>
          <p>{{ level.name }}</p>
        </div>
        <div class="wizmi-level-options">
          <draggable
            v-model="cardOptions"
            :animation="200"
            ghost-class="ghost-card"
            group="options"
            class="wizmi-draggable wizmi-draggable-column"
          >
            <transition-group name="options">
              <div v-for="movement in cardOptions" :key="movement.id" class="wizmi-square-card yellow">
                <p>{{ movement.quantity }}</p>
                <div v-if="movement.direction" class="card-arrow">
                  <img src="../../../assets/icons/arrow-right-solid.svg" :alt="'arrow pointing ' + movement.direction" :class="getArrowRotationClass(movement.direction)">
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>

      <div class="flex flex-column wizmi-level-playable-area">
        <div class="wizmi-level-timeline">
          <draggable
            v-model="cardChosen"
            :animation="200"
            ghost-class="ghost-card"
            group="options"
            class="wizmi-draggable wizmi-draggable-row"
          >
            <transition-group name="timeline">
              <div v-for="movement in cardChosen" :key="movement.id" class="wizmi-square-card yellow">
                <p>{{ movement.quantity }}</p>
                <div v-if="movement.direction" class="card-arrow">
                  <img src="../../../assets/icons/arrow-right-solid.svg" :alt="'arrow pointing ' + movement.direction" :class="getArrowRotationClass(movement.direction)">
                </div>
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
import { Component, InjectReactive, Provide, Watch, Vue } from 'nuxt-property-decorator'
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
  @Provide() cardOptions: Array<any> = []
  @Provide() cardChosen: Array<any> = []

  @Watch('level')
  onLevelChanged () {
    this.setOptions()
  }

  watch () {
    this.setOptions()
  }

  setOptions () {
    this.cardOptions = this.level.data?.actions.movements
  }

  resetTimeline () {
    this.cardChosen = []
    this.setOptions()
  }

  togglePlay () {
    this.play = !this.play
  }

  getArrowRotationClass (direction: string) {
    switch (direction) {
      case 'up':
        return 'arrow_up'
      case 'down':
        return 'arrow_down'
      case 'right':
        return 'arrow_right'
      case 'left':
        return 'arrow_left'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/variables";

$margin: 16px;
$topElementsHeight: 20%;

// TODO? : Move to global css ?
.wizmi-level-info, .wizmi-level-options, .wizmi-level-timeline, .wizmi-level-game-area{
  // border: 2px solid $blue;
  // box-sizing: border-box;
  padding: 16px;

  background-color: white;
  color: $blue;
  border-radius: 4px;
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

.wizmi-draggable{
  height: 100%;
  width: 100%;

  span{
    display: grid;
    grid-auto-rows: 100px;

    width: 100%;
    height: 100%;
    gap: 16px;

    .wizmi-square-card{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .yellow{
      grid-column-end: span 1;
      grid-row-end: span 1;
      background-color: rgb(255, 210, 88);
    }
  }
}

.wizmi-draggable-column span{
  grid-template-columns: repeat(3, 1fr);
}

.wizmi-draggable-row span{
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: 100px;
}

.card-arrow{
  width: 24px;
  height: 24px;
}
.arrow_up{
  transform: rotate(270deg);
}
.arrow_down{
  transform: rotate(90deg);
}
.arrow_right{
  transform: rotate(0deg);
}.arrow_left{
  transform: rotate(180deg);
}

</style>
