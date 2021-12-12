<template>
  <div class="container wizmi-level-container">
    <Square v-if="level.type === 'SQUARE'" />
  </div>
</template>

<script lang="ts">
import { Component, ProvideReactive, Vue } from 'nuxt-property-decorator'
import Square from '../../components/Levels/Square/Square.vue'
import LevelsApiHelper from '~/plugins/api/levels'
import { Levels } from '~/store/interfaces'

const levelsApiHelper = new LevelsApiHelper()

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
    const level: Levels = await levelsApiHelper.getLevelById(id)
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
