<template>
  <div class="wizmi-level-game-area">
    <div class="wizmi-square">
      <div
        v-for="(squareRow, rowIndex) in grid"
        :id="`r-${rowIndex}`"
        :key="rowIndex"
        class="square-row"
      >
        <div
          v-for="(squareColumn, columnIndex) in squareRow"
          :id="`r-${rowIndex}-c-${columnIndex}`"
          :key="columnIndex"
          class="square-column"
          :class="{'full' : squareColumn === 1, 'empty' : squareColumn !== 1, 'end': rowIndex === end[0] && columnIndex === end[1]}"
        >
          <square-player v-if="rowIndex === player[0] && columnIndex === player[1]" />
          <square-key v-if="keys.find(k => k.position[0] === rowIndex && k.position[1] === columnIndex) ? true : false" />
          <square-sword v-if="swords.find(s => s.position[0] === rowIndex && s.position[1] === columnIndex) ? true : false" />
          <square-door v-if="doors.find(d => d.position[0] === rowIndex && d.position[1] === columnIndex) ? true : false" />
          <square-ennemy v-if="ennemies.find(e => e.position[0] === rowIndex && e.position[1] === columnIndex) ? true : false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Door, Ennemy, Key, Sword } from 'wizmi'
import SquarePlayer from './SquarePlayer.vue'
import SquareKey from './SquareItem/SquareKey.vue'
import SquareSword from './SquareItem/SquareSword.vue'
import SquareDoor from './SquareTrigger/SquareDoor.vue'
import SquareEnnemy from './SquareTrigger/SquareEnnemy.vue'

@Component({
  components: {
    SquarePlayer,
    SquareKey,
    SquareSword,
    SquareDoor,
    SquareEnnemy
  }
})
export default class SquareGrid extends Vue {
  @Prop() readonly grid!: number[][]
  @Prop({ default: () => [0, 0] }) readonly player!: number[]
  @Prop() readonly end!: number[]
  @Prop({ default: () => [] }) readonly keys!: Key[]
  @Prop({ default: () => [] }) readonly swords!: Sword[]
  @Prop({ default: () => [] }) readonly doors!: Door[]
  @Prop({ default: () => [] }) readonly ennemies!: Ennemy[]
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/variables";

.wizmi-level-game-area {
  padding: 16px;
  background-color: white;
  color: $blue;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

.wizmi-square {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto auto;
  .square-row{
    display:flex;
    flex-direction: row;
    height: 64px;
    box-sizing: border-box;
    .square-column{
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
</style>
