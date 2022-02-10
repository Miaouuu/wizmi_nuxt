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
            <div v-for="(movement, index) in cardOptions" :key="movement.id" class="wizmi-square-card yellow" @click="toggleCard('options', index)">
              <div v-if="movement.direction" class="card-arrow">
                <img src="../../../assets/icons/arrow-right-solid.svg" :alt="'arrow pointing ' + movement.direction" :class="getArrowRotationClass(movement.direction)">
              </div>
              <p class="m-0">
                {{ movement.quantity }}
              </p>
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
            <div v-for="(movement, index) in cardChosen" :key="movement.id" class="wizmi-square-card yellow" @click="toggleCard('chosen', index)">
              <div v-if="movement.direction" class="card-arrow">
                <img src="../../../assets/icons/arrow-right-solid.svg" :alt="'arrow pointing ' + movement.direction" :class="getArrowRotationClass(movement.direction)">
              </div>
              <p class="m-0">
                {{ movement.quantity }}
              </p>
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
            <div id="player" class="wizmi-player" />
            <div
              v-for="(squareRow, rowIndex) in gameGrid"
              :id="`r-${rowIndex}`"
              :key="rowIndex"
              class="square-row"
            >
              <div
                v-for="(squareBox, boxIndex) in squareRow"
                :id="`r-${rowIndex}-b-${boxIndex}`"
                :key="boxIndex"
                class="square-box"
                :class="{'full' : squareBox === 1, 'empty' : squareBox !== 1, 'end': rowIndex === level.data.end[0] && boxIndex === level.data.end[1]}"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Watch, Vue } from 'nuxt-property-decorator'
import draggable from 'vuedraggable'
import { Movement, Levels, squareResolver } from 'wizmi'

@Component({
  components: {
    draggable
  }
})

export default class SquareLevel extends Vue {
  @InjectReactive() level!: Levels
  public isPlaying: boolean = false
  public cardOptions: Array<Movement> = []
  public cardChosen: Array<Movement> = []
  public gameGrid: Array<Array<number>> = []
  public playerPosition: Array<number> = []
  public playerActionsQueue: Array<Array<number>> = []

  @Watch('level')
  onLevelChanged () {
    this.setOptions()
    this.setGrid()
  }

  setOptions () {
    this.cardOptions = [...this.level.data?.actions?.movements]
  }

  setGrid () {
    if (this.level.data.grid) {
      this.gameGrid = this.level.data.grid
      this.playerPosition = this.level.data.start
      this.movePlayerToHisPosition()
    }
  }

  toggleCard (array: string, index: number) {
    if (array === 'chosen') {
      const card = this.cardChosen[index]
      this.cardChosen.splice(index, 1)
      this.cardOptions.push(card)
    } else {
      const card = this.cardOptions[index]
      this.cardOptions.splice(index, 1)
      this.cardChosen.push(card)
    }
  }

  async togglePlay () {
    this.isPlaying = !this.isPlaying
    const levelFinished = squareResolver(this.level.data, this.cardChosen, {
      cbPlayerPosition: this.pushPlayerActions
    })
    await this.startPlayerActionsQueue()
    if (levelFinished) {
      window.location.href = '/levels/' + (this.level.id + 1)
    }
  }

  sleep (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  pushPlayerActions (position: number[]) {
    this.playerActionsQueue.push(position)
  }

  async startPlayerActionsQueue () {
    if (this.isPlaying) {
      await this.resetPlayerToInitialPosition()
      for (const position of this.playerActionsQueue) {
        this.setPlayerPosition(position[0], position[1])
        await this.sleep(400)
      }
    }
    this.isPlaying = false
    this.playerActionsQueue = []
  }

  setPlayerPosition (newX: number, newY: number) {
    this.playerPosition = [newX, newY]
    this.movePlayerToHisPosition()
  }

  movePlayerToHisPosition () {
    const player = document.getElementById('player')
    const targetBoxId = 'r-' + this.playerPosition[0] + '-b-' + this.playerPosition[1]
    const targetBoxElement = document.getElementById(targetBoxId)
    if (targetBoxElement) {
      const centerX = targetBoxElement.offsetLeft + (targetBoxElement.offsetWidth / 2)
      const centerY = targetBoxElement.offsetTop + (targetBoxElement.offsetHeight / 2)
      if (player) {
        const posLeft = centerX - (player.offsetWidth / 2)
        const posTop = centerY - (player.offsetHeight / 2)
        player.style.transform = 'translate(' + posLeft + 'px, ' + posTop + 'px)'
      }
    }
  }

  resetTimeline () {
    this.cardChosen = []
    this.playerActionsQueue = []

    this.setOptions()

    this.resetPlayerToInitialPosition()
  }

  async resetPlayerToInitialPosition () {
    this.playerPosition = this.level.data.start
    this.movePlayerToHisPosition()
    await this.sleep(500)
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
      position: relative;
      display: flex;
      flex-direction: column;
      margin: auto auto;
      .wizmi-player{
        position: absolute;
        width: 16px;
        height: 16px;
        background-color: red;
        border-radius: 50%;
        z-index: 1000;
        transition: transform 0.3s;
      }

      .square-row{
        display:flex;
        flex-direction: row;
        height: 64px;
        box-sizing: border-box;
        .square-box{
          display:flex;
          justify-content: center;
          align-items: center;
          width: 64px;
          height: 100%;
          border: 1px solid $blue;
          box-sizing: border-box;

        }
        .end{
            background-color: limegreen;
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
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
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
