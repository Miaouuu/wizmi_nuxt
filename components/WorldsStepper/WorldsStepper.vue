<template>
  <div class="">
    Stepper
    {{ worlds }}
  </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from 'vue'
import { Worlds } from '~/store/interfaces'

export default Vue.extend({
  name: 'WorldsStepperComponent',
  props: {
    worlds: {
      type: Array,
      required: true
    } as PropOptions<Worlds[]>
  },
  methods: {

  }
})
</script>

<style scoped>

</style>
