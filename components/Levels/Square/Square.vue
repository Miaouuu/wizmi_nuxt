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
            class="wizmi-draggable"
          >
            <transition-group name="options">
              <div v-for="movement in cardOptions" :key="movement.id" class="wizmi-square-card yellow">
                <p>{{ movement.quantity }}</p>
                <p>{{ movement.direction }}</p>
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
            class="wizmi-draggable"
          >
            <transition-group name="timeline">
              <div v-for="movement in cardChosen" :key="movement.id" class="wizmi-square-card yellow">
                <p>{{ movement.quantity }}</p>
                <p>{{ movement.direction }}</p>
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

  resetTimeline () {
    return true
  }

  togglePlay () {
    this.play = !this.play
  }

  setOptions () {
    this.cardOptions = this.level.data?.actions.movements
    console.log(this.cardOptions)
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
  box-sizing: border-box;
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

.wizmi-draggable{
  height: 100%;
  width: 100%;

  span{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 100px;

    width: 100%;
    height: 100%;
    gap: 10px;

    background-color: #ccc;

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

</style>
