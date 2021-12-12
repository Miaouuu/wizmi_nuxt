<template>
  <div class="flex flex-column">
    <div class="flex flex-row h-100">
      <div class="flex flex-column wizmi-level-aside">
        <div class="wizmi-level-info">
          1-1
        </div>
        <div class="wizmi-level-options">
          aside
        </div>
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
    height: $topElementsHeight;
    margin-bottom: $margin;
  }
  .wizmi-level-game-area{
    display: flex;
    flex-grow: 1;
  }
}

</style>
