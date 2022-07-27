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
import WorldsApiHelper from '~/plugins/api/worlds'

const worldsApiHelper = new WorldsApiHelper()

@Component({
  components: {
    WorldsStepper
  }
})
export default class WorldsPage extends Vue {
  @Provide() worlds: Worlds[] = []

  layout () {
    return 'wizmi-base'
  }

  async mounted () {
    await this.getWorlds()
  }

  async getWorlds () {
    const worlds: Worlds[] = await worldsApiHelper.getWorlds()
    this.worlds = worlds
  }
}
</script>
