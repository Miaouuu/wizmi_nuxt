<template>
  <div class="flex flex-column">
    <div class="flex flex-row h-100">
      <div class="flex flex-column wizmi-level-aside">
        <div class="wizmi-level-info">
          <div class="wizmi-level-info--location">
            {{ level.worldId }} - {{ level.id }}
          </div>
          <div class="wizmi-level-info--name">
            {{ level.name }}
          </div>
        </div>
        <div class="wizmi-level-options">
          <draggable
            v-model="cardOptions"
            :animation="200"
            ghost-class="ghost-card"
            group="options"
            class="wizmi-draggable wizmi-draggable-column"
          >
            <div v-for="movement in cardOptions" :key="movement.id" class="wizmi-square-card yellow">
              <p>{{ movement.quantity }}</p>
              <div v-if="movement.direction" class="card-arrow">
                <img src="../../../assets/icons/arrow-right-solid.svg" :alt="'arrow pointing ' + movement.direction" :class="getArrowRotationClass(movement.direction)">
              </div>
            </div>
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
            <div v-for="movement in cardChosen" :key="movement.id" class="wizmi-square-card yellow">
              <p>{{ movement.quantity }}</p>
              <div v-if="movement.direction" class="card-arrow">
                <img src="../../../assets/icons/arrow-right-solid.svg" :alt="'arrow pointing ' + movement.direction" :class="getArrowRotationClass(movement.direction)">
              </div>
            </div>
          </draggable>

          <div class="play" @click="togglePlay()">
            <img v-if="isPlaying === false" src="~/assets/icons/play-solid.svg">
            <img v-else src="~/assets/icons/pause-solid.svg">
          </div>
          <div class="trash" @click="resetTimeline()">
            <img src="~/assets/icons/trash-alt-solid.svg">
          </div>
        </div>

        <div class="wizmi-level-game-area">
          <div class="wizmi-square">
            <div v-for="(squareRow, rowIndex) in gameGrid" :key="rowIndex" class="square-row">
              <div
                v-for="(squareBox, boxIndex) in squareRow"
                :key="boxIndex"
                class="square-box"
                :class="squareBox === 1 ? 'full' : 'empty'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Provide, Watch, Vue } from 'nuxt-property-decorator'
import draggable from 'vuedraggable'
import { Levels, Movements } from '~/store/interfaces'

@Component({
  components: {
    draggable
  }
})

export default class Square extends Vue {
  @InjectReactive() level!: Levels
  @Provide() isPlaying: boolean = false
  @Provide() cardOptions: Array<Movements> = []
  @Provide() cardChosen: Array<Movements> = []
  @Provide() gameGrid: Array<Array<number>> = []

  @Watch('level')
  onLevelChanged () {
    this.setOptions()
    this.setGrid()
  }

  setOptions () {
    this.cardOptions = this.level.data?.actions.movements
  }

  setGrid () {
    this.gameGrid = this.level.data.grid
  }

  resetTimeline () {
    this.cardChosen = []
    this.setOptions()
  }

  togglePlay () {
    this.isPlaying = !this.isPlaying
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

    .wizmi-level-info--location{
      font-size: 32px;
    }
    .wizmi-level-info--name{
      font-size: 24px;
    }
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

    .wizmi-square {
      display: flex;
      flex-direction: column;
      margin: auto auto;
      .square-row{
        display:flex;
        flex-direction: row;
        height: 80px;

        .square-box{
          width: 80px;
          height: 100%;
          border: 1px solid $blue;
        }
        .full{
          background-color: $blue;
        }
      }
    }
  }
}

.wizmi-draggable{
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

.wizmi-draggable-column {
  grid-template-columns: repeat(3, 1fr);
}

.wizmi-draggable-row {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: 100px;
}

.ghost-card {
  border: 1px solid red;
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
