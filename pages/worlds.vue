<template>
  <div class="relative flex flex-1 container">
    <h1>Découvrez les différents mondes</h1>
    <!-- <WorldsStepper :worlds="worlds" /> -->
    <img src="../assets/icons/undraw_connected_world_way_1.svg" class="absolute bottom-0"/>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'nuxt-property-decorator'
import { Worlds } from 'wizmi'
import WorldsStepper from '@/components/WorldsStepper/WorldsStepper.vue'

@Component({
  components: {
    WorldsStepper
  }
})
export default class WorldsPage extends Vue {
  @Provide() worlds: Worlds[] = []

  layout () {
    return 'base'
  }

  async mounted () {
    await this.getWorlds()
  }

  async getWorlds () {
    const worlds: Worlds[] = await this.$api.worlds.getWorlds()
    this.worlds = worlds
  }
}
</script>

<style lang="scss" scoped>
.bottom-0{
  bottom: 0;
}
</style>
