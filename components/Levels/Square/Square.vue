<template>
  <div class="flex flex-column">
    <div class="flex flex-row h-100">
      <div class="wizmi-level-aside">
        aside
      </div>
      <div class="flex flex-column wizmi-level-playable-area">
        <div class="wizmi-level-timeline">
          timeline
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
import { Component, InjectReactive, Vue } from 'nuxt-property-decorator'
import { Levels } from '~/store/interfaces'

@Component
export default class Square extends Vue {
    @InjectReactive() level!: Levels
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/variables";

// TODO? : Move to global css ?
.wizmi-level-aside, .wizmi-level-timeline, .wizmi-level-game-area{
  border: 2px solid $blue;
  border-radius: 8px;
}
.wizmi-level-aside{
  display: flex;
  flex-grow: 1;

  width: 25%;
}

.wizmi-level-playable-area{
  flex-grow: 1;

  margin-left: 2%;

  .wizmi-level-timeline{
    height: 20%;
    margin-bottom: 2%;
  }
  .wizmi-level-game-area{
    display: flex;

    flex-grow: 1;
  }
}

</style>
