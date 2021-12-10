<template>
  <div>
    <div>Page level</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class LevelsPage extends Vue{
  layout(){
    return 'wizmi-base'
  } 
}
</script>
