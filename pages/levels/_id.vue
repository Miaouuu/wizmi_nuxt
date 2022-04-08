<template>
  <div class="container wizmi-level-container">
    <square-level />
    <!-- <Square v-if="level.type === 'SQUARE'" /> -->
  </div>
</template>

<script lang="ts">
import { Component, ProvideReactive, Vue } from 'nuxt-property-decorator'
import { Levels } from 'wizmi'
import SquareLevel from '@/components/Levels/Square/SquareLevel.vue'

@Component({
  components: {
    SquareLevel
  }
})
export default class LevelsPage extends Vue {
  @ProvideReactive() level = {
    data: {}
  } as Levels

  layout () {
    return 'base'
  }

  async mounted () {
    await this.getLevel()
  }

  async getLevel () {
    const id: string = this.$route.params.id
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
