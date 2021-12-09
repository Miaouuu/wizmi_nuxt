<template>
  <div class="">
    Stepper
    {{ worlds }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'WorldsStepperComponent',
  props: {
    worlds: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped>

</style>
