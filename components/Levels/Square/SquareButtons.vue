<template>
  <div>
    <div class="mode">
      <p>{{ full ? "Full" : "Partial" }}</p>
    </div>
    <div class="play" @click="togglePlay()">
      <img v-if="!isPlaying" src="@/assets/icons/play.svg">
      <img v-else src="@/assets/icons/pause.svg">
    </div>
    <div class="trash" @click="clean()">
      <img src="@/assets/icons/trash.svg">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class SquareButtons extends Vue {
  @Prop({ default: true }) readonly full!: Boolean
  @Prop({ default: false }) isPlaying!: Boolean

  @Emit()
  togglePlay () {
    return true
  }

  @Emit()
  clean () {
    return true
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/variables";

.play, .trash, .mode{
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
.mode {
  right: 96px;
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
}
</style>
