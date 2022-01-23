<template>
  <div class="container wizmi-level-container">
    <Square />
    <!-- <Square v-if="level.type === 'SQUARE'" /> -->
  </div>
</template>

<script lang="ts">
import { Component, ProvideReactive, Vue } from 'nuxt-property-decorator'
import { Levels } from 'wizmi'
import Square from '../../components/Levels/Square/SquareLevel.vue'

@Component({
  components: {
    Square
  }
})
export default class LevelsPage extends Vue {
  @ProvideReactive() level = {} as Levels

  layout () {
    return 'wizmi-base'
  }

  async mounted () {
    await this.getLevel()
  }

  getLevelId () : string {
    const url: string = window.location.pathname
    const id : string = url.substring(url.lastIndexOf('/') + 1)
    return id
  }

  async getLevel () {
    const id: string = this.getLevelId()
    const level: Levels = await this.$api.levels.getLevelById(id)
    this.level = level
  }
}
</script>

<style lang="scss" scoped>
.wizmi-level-container{
  display: flex;
  flex-grow: 1;

  height: 100%;
}
</style>
