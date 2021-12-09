<template>
  <div>
    <h1>Page Worlds</h1>
    <WorldsStepper />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import WorldsStepper from '@/components/WorldsStepper/WorldsStepper.vue'

interface Worlds{
  name: string,
  value: number,
  levels: []
}

export default Vue.extend({
  name: 'WorldsPage',
  components: { WorldsStepper },
  layout: 'wizmi-base',
  data () {
    return {
      worlds: {} as Worlds
    }
  },
  mounted () {
    this.ok()
  },
  methods: {
    ok () {
      console.log('test')
    }
  }
})
</script>
