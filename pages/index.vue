<template>
  <div>
    <div>Page Index</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue{
  layout(){
    return 'wizmi-base'
  } 
}
</script>
