<template>
  <div>
    <h1>Page Worlds</h1>
    <WorldsStepper :worlds="worlds" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Worlds } from '~/store/interfaces'
import WorldsStepper from '@/components/WorldsStepper/WorldsStepper.vue'
import WorldsApiHelper from '~/plugins/api/worlds'

const worldsApiHelper = new WorldsApiHelper;

@Component({
  components: {
    WorldsStepper
  }
})
export default class WorldsPage extends Vue{
  worlds: Worlds[] = []

  layout(){
    return 'wizmi-base'
  } 

  async mounted () {
    await this.getWorlds()
  }

  async getWorlds() {
    await worldsApiHelper.getWorlds()
  }
}
</script>
