<template>
  <div class="absolute">
    <div class="play" @click="togglePlay()">
      <img v-if="!isPlaying" src="@/assets/icons/play.svg">
      <img v-else src="@/assets/icons/pause.svg">
    </div>
    <img class="trash" src="@/assets/icons/trash.svg" @click="clean()">
    <img class="infos" src="@/assets/icons/learning.svg" style="width: 28px;" @click="openInfos()">
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

  @Emit()
  openInfos () {
    return true
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/variables";
.absolute {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 8px;
  right: 12px;
  gap: 0.5rem;
}
.play, .trash, .infos{
  cursor: pointer;
}
img{
  height: 24px;
  width: 24px;
}
</style>
