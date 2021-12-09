<template>
  <div class="layout-root">
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

export default Vue.extend({
  components: { Navbar, Footer },
  layout () {
    return 'wizmi-base'
  }
})
</script>

<style scoped>
.layout-root {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 16px);
  padding: 8px;
}
</style>
