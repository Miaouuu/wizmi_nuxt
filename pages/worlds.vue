<template>
  <div>
    <h1>Page Worlds</h1>
    <WorldsStepper :worlds="worlds" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Worlds } from '~/store/interfaces'
import WorldsStepper from '@/components/WorldsStepper/WorldsStepper.vue'

export default Vue.extend({
  name: 'WorldsPage',
  components: { WorldsStepper },
  layout: 'wizmi-base',
  data () {
    return {
      worlds: [] as Worlds[]
    }
  },
  async mounted () {
    await this.getWorlds()
  },
  methods: {
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
})
</script>
