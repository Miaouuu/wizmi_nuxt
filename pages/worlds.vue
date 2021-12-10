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

  getWorlds () {
    // this.worlds = worldsData
  }
  // TODO : Move to api file
  // async getWorlds () {
  //   await fetch(
  //     'https://wizmi-dev.miaou.land/worlds'
  //   ).then((res) => {
  //     this.worlds = res.json()
  //   }).then(() => {
  //     console.log(this.worlds)
  //   })
  // }
}
</script>
