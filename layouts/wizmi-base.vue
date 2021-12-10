<template>
  <div class="layout-root">
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

@Component({
  components: {
    Navbar,
    Footer
  }
})
export default class WizmiBase extends Vue {
  layout () {
    return 'wizmi-base'
  }
}
</script>

<style scoped>
.layout-root {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 16px);
  padding: 8px;
}
</style>
