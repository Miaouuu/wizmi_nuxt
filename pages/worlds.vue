<template>
  <div>
    <h1>Page Worlds</h1>
    <WorldsStepper :worlds="worlds" />
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
