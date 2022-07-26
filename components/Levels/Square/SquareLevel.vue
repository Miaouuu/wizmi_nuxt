<template>
  <div class="flex-row h-100 w-100 gap-4">
    <div class="wizmi-level-aside flex-1">
      <div class="wizmi-level-info gap-2">
        <div class="wizmi-level-info--location">
          {{ level.worldId }} - {{ level.id }}
        </div>
        <div class="wizmi-level-info--name">
          {{ level.name }}
        </div>
      </div>
      <div class="wizmi-level-options flex-1">
        <draggable
          v-model="cardOptions"
          :animation="200"
          ghost-class="ghost-card"
          group="options"
          class="wizmi-draggable wizmi-draggable-column"
        >
          <template v-for="(card, index) in cardOptions">
            <div v-if="card.direction" :key="card.direction" class="wizmi-square-card yellow" @click="intoChosen(index)">
              <square-card-movement :movement="card" />
            </div>
            <div v-if="card.block" :key="card.block" class="wizmi-square-card yellow" @click="intoChosen(index)" style="grid-column: span 2 / span 2;">
              <square-card-loop :loop="card" />
            </div>
            <div v-if="card.action" :key="card.action"  class="wizmi-square-card yellow" @click="intoChosen(index)" style="grid-column: span 2 / span 2;">
              <square-card-condition :condition="card" />
            </div>
          </template>
        </draggable>
      </div>
    </div>

    <div class="flex-column wizmi-level-playable-area">
      <div class="wizmi-level-timeline">
        <draggable
          v-model="cardChosen"
          :animation="200"
          ghost-class="ghost-card"
          group="options"
          class="wizmi-draggable wizmi-draggable-row"
        >
          <template v-for="(card, index) in cardChosen">
            <div v-if="card.direction" :key="card.direction" class="wizmi-square-card yellow" @click="intoOptions(index)">
              <square-card-movement :movement="card" />
            </div>
            <div v-if="card.block" :key="card.block" class="wizmi-square-card yellow" @click="intoOptions(index)" style="grid-column: span 2 / span 2;">
              <square-card-loop :loop="card" />
            </div>
            <div v-if="card.action" :key="card.action" class="wizmi-square-card yellow" @click="intoOptions(index)" style="grid-column: span 2 / span 2;">
              <square-card-condition :condition="card" />
            </div>
          </template>
        </draggable>
        <square-buttons :full="full" :is-playing="isPlaying" @toggle-play="togglePlay" @clean="resetTimeLine" />
      </div>
      <square-grid
        :grid="grid"
        :end="end"
        :player="player"
        :keys="keys"
        :swords="swords"
        :doors="doors"
        :ennemies="ennemies"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Watch, Vue } from 'nuxt-property-decorator'
import draggable from 'vuedraggable'
import { Levels, Actions, Key, Sword, Door, Ennemy, squareResolver } from 'wizmi'
import SquareCardMovement from './SquareCard/SquareCardMovement.vue'
import SquareCardLoop from './SquareCard/SquareCardLoop.vue'
import SquareCardCondition from './SquareCard/SquareCardCondition.vue'
import SquareGrid from './SquareGrid.vue'
import SquareButtons from './SquareButtons.vue'

@Component({
  components: {
    draggable,
    SquareCardMovement,
    SquareCardLoop,
    SquareCardCondition,
    SquareGrid,
    SquareButtons
  }
})
export default class SquareLevel extends Vue {
  @InjectReactive() level!: Levels
  public cardOptions: Actions[] = []
  public cardChosen: Actions[] = []
  public player: number[] = [0, 0]
  public keys: Key[] = []
  public swords: Sword[] = []
  public doors: Door[] = []
  public ennemies: Ennemy[] = []
  public isPlaying: Boolean = false
  public playerActionsQueue: number[][] = []

  @Watch('level')
  onLevelChanged () {
    this.setOptions()
    this.player = [...this.level.data.start]
    this.keys = [...this.level.data.items.keys]
    this.swords = [...this.level.data.items.swords]
    this.doors = [...this.level.data.triggers.doors]
    this.ennemies = [...this.level.data.triggers.ennemies]
  }

  setOptions () {
    this.cardOptions = [...this.level.data.actions.movements,
      ...this.level.data.actions.loops,
      ...this.level.data.actions.conditions]
      .sort(() => 0.5 - Math.random())
  }

  intoOptions (index: number) {
    const card = this.cardChosen[index]
    this.cardChosen.splice(index, 1)
    this.cardOptions.push(card)
  }

  intoChosen (index: number) {
    const card = this.cardOptions[index]
    this.cardOptions.splice(index, 1)
    this.cardChosen.push(card)
  }

  get grid () {
    return this.level.data.grid
  }

  get full () {
    return this.level.data.full
  }

  get end () {
    return this.level.data.end
  }

  sleep (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async togglePlay () {
    this.isPlaying = !this.isPlaying
    const cardChosen = [...this.cardChosen]
    const levelFinished = squareResolver(this.level.data, cardChosen, {
      cbPlayerPosition: this.pushPlayerActions
    })
    await this.startPlayerActionsQueue()
    if (levelFinished) {
      console.log('NICE')
    }
  }

  resetTimeLine () {
    this.onLevelChanged()
    this.cardChosen = []
    this.playerActionsQueue = []
  }

  pushPlayerActions (position: number[]) {
    this.playerActionsQueue.push(position)
  }

  async startPlayerActionsQueue () {
    if (this.isPlaying) {
      this.player = [...this.level.data.start]
      for (const position of this.playerActionsQueue) {
        this.player = position
        await this.sleep(400)
      }
    }
    this.isPlaying = false
    this.playerActionsQueue = []
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/variables";

$margin: 16px;
$topElementsHeight: 15%;

.wizmi-level-info, .wizmi-level-options, .wizmi-level-timeline {
  padding: 16px;
  background-color: white;
  color: $light-blue;
  display: flex;
  flex-direction: column;
}
.wizmi-level-info, .wizmi-level-options {
  border-radius: 8px;
}

.wizmi-level-aside {
  display: flex;
  flex-direction: column;
  gap: $margin;
  max-width: 20%;

  .wizmi-level-info {
    height: $topElementsHeight;
    min-height: 120px;
    font-weight: 700;

    .wizmi-level-info--location {
      font-size: 32px;
    }
    .wizmi-level-info--name {
      font-size: 24px;
      text-transform: uppercase;
      color: #262626;
    }
  }
  .wizmi-level-options {
    display: flex;
  }
}

.wizmi-draggable{
  display: grid;
  grid-auto-rows: 48px;
  width: 100%;
  height: 100%;
  column-gap: 8px;
  row-gap: 16px;

  .wizmi-square-card{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
    border-radius: 8px;
  }

  .yellow{
    grid-column-end: span 1;
    grid-row-end: span 1;
    background-color: rgb(255, 210, 88);
  }
}

.wizmi-level-playable-area{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: $margin;

  .wizmi-level-timeline {
    position: relative;
    height: $topElementsHeight;
    min-height: 120px;

    img{
      height: 24px;
      width: 24px;
    }
  }
  .wizmi-level-game-area {
    display: flex;
  }
}

.wizmi-draggable-column {
  grid-template-columns: repeat(3, 1fr);
}

.wizmi-draggable-row {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}

.ghost-card {
  border: 1px solid red;
}
</style>
