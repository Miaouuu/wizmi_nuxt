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
                :class="squareBox === 1 ? 'full' : 'empty'"
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
import { changePlayerPosition, Condition, directionValue, isInside, Loop, Movement, Square, Items } from 'wizmi'
import { Levels } from '~/store/interfaces'

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

  @Watch('level')
  onLevelChanged () {
    this.setOptions()
    this.setGrid()
  }

  setOptions () {
    this.cardOptions = this.level.data?.actions?.movements
  }

  setGrid () {
    if (this.level.data.grid) {
      console.log('grid is loaded')
      this.gameGrid = this.level.data.grid
      this.setPlayerPosition(this.level.data.start[0], this.level.data.start[1])
    }
  }

  setPlayerPosition (newX: number, newY: number) {
    this.playerPosition = [newX, newY]
    console.log(this.playerPosition, 'player position')
    this.movePlayerToHisPosition()
  }

  movePlayerToHisPosition () {
    const fragment = document.createDocumentFragment()
    const player = document.getElementById('player')
    const targetBoxId = 'r-' + this.playerPosition[0] + '-b-' + this.playerPosition[1]

    if (document.getElementById(targetBoxId)) {
      console.log(targetBoxId)
      if (player) { fragment.appendChild(player) }
      document.getElementById(targetBoxId)?.appendChild(fragment)
    }
  }

  // TODO : Clean to wizmi dep
  squareResolver (
    square: Square,
    responses: (Movement | Condition | Loop)[]
  ) {
  // INIT
    console.log(responses)
    let player = square.start
    const { movements, conditions, loops } = square.actions
    let { doors, ennemies } = square.triggers
    let { keys, swords } = square.items
    const totalActions = movements.length + conditions.length + loops.length
    if (totalActions !== responses.length) {
      return false
    }
    // LOOP TO START THE GAME
    let actualAction = 0
    let actionResponseLoop: Loop = {
      id: 0,
      condition: 0,
      block: 0
    }
    const actionLoop: Loop = {
      id: 0,
      condition: 0,
      block: 0
    }
    let initActionLoop = 0

    while (actualAction < responses.length) {
      let triggerOn: Items
      let blocked = false
      let response
      if (actionLoop.condition < actionResponseLoop.condition) {
        if (actionLoop.block === actionResponseLoop.block) {
          actionLoop.condition += 1
          actionLoop.block = 0
        }
        if (actionLoop.block < actionResponseLoop.block) {
          actionLoop.block += 1
        }
        response = responses[initActionLoop + actionLoop.block]
        actualAction = initActionLoop
      } else {
        response = responses[actualAction]
      }
      if (actionLoop.condition === actionResponseLoop.condition &&
      actionLoop.block === actionResponseLoop.block &&
      actionResponseLoop.condition !== 0) {
        actionResponseLoop.condition = 0
        actualAction = initActionLoop + actionResponseLoop.block + 1
        response = responses[actualAction]
      }
      if (!response) {
        actualAction += 1
        continue
      }
      keys = keys.map((key) => {
        if (key.position[0] === player[0] && key.position[1] === player[1]) {
          return {
            ...key,
            taken: true
          }
        }
        return key
      })
      swords = swords.map((sword) => {
        if (sword.position[0] === player[0] && sword.position[1] === player[1]) {
          return {
            ...sword,
            taken: true
          }
        }
        return sword
      })
      // ! PERMET PAS DE GERER PLUSIEURS ITEM EN MEME TEMPS && NOT REUSABLE
      const isCondition = isInside(response, conditions)
      if (isCondition) {
        const condition = response as Condition
        if (condition.action === Items.Key) {
          const hasKey = keys.findIndex(key => key.taken)
          if (hasKey > -1) {
            keys.slice(hasKey, 1)
            triggerOn = Items.Key
          }
        } else if (condition.action === Items.Sword) {
          const hasSword = keys.findIndex(sword => sword.taken)
          if (hasSword > -1) {
            keys.slice(hasSword, 1)
            triggerOn = Items.Sword
          }
        }
      }

      doors = doors.map((door) => {
        if (door.position[0] === player[0] && door.position[1] === player[1] && !blocked) {
          if (!door.open) {
            if (door.needKey) {
              if (triggerOn === Items.Key) {
                return {
                  ...door,
                  open: true
                }
              }
              blocked = true
            }
          }
        }
        return door
      })

      // ! NE PEUT PAS BOUGER POUR L'INSTANT
      ennemies = ennemies.map((ennemy) => {
        if (ennemy.position[0] === player[0] && ennemy.position[1] === player[1] && !blocked) {
          if (!ennemy.dead) {
            if (ennemy.needSword) {
              blocked = triggerOn !== Items.Sword
              if (blocked) {
                return {
                  ...ennemy,
                  open: true
                }
              }
            }
          }
        }
        return ennemy
      })
      if (blocked) {
        actualAction += 1
        continue
      }
      const isLoop = isInside(response, loops)
      // ! PERMET PAS DE FAIRE DES LOOP DANS DES LOOP
      if (isLoop) {
        const loop = response as Loop
        initActionLoop = actualAction
        actionResponseLoop = loop
        continue
      }
      const isMovement = isInside(response, movements)
      if (isMovement) {
        const movement = response as Movement
        const direction = directionValue(movement.direction)
        for (let i = 0; i < movement.quantity; i += 1) {
          player = changePlayerPosition(
            direction,
            {
              start: player,
              shape: square.shape,
              grid: square.grid,
              infinity: square.infinity
            }
          )
        }
        console.log('ircjbreiob')
        this.setPlayerPosition(player[0], player[1])
        actualAction += 1
        continue
      }
      actualAction += 1
    }
    // END
    if (JSON.stringify(player) !== JSON.stringify(square.end)) {
      return false
    }
    return true
  };

  resetTimeline () {
    this.cardChosen = []
    this.setOptions()
  }

  togglePlay () {
    console.log('toggleplay')
    this.isPlaying = !this.isPlaying
    this.squareResolver(this.level.data, this.cardChosen)
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

    .wizmi-player{
      display: none;
      width: 15px;
      height: 15px;
      background-color: red;
      border-radius: 50%;
      z-index: 1000;
    }

    .wizmi-square {
      display: flex;
      flex-direction: column;
      margin: auto auto;
      .square-row{
        display:flex;
        flex-direction: row;
        height: 60px;
        .square-box{
          display:flex;
          justify-content: center;
          align-items: center;
          width: 60px;
          height: 100%;
          border: 1px solid $blue;
          .wizmi-player{
            display: block;
          }
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
