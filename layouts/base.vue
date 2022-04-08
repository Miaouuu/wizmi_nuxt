<template>
  <div class="layout-root">
    <navbar />
    <Nuxt />
    <footer />
  </div>
</template>

<style scoped>
.layout-root {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 16px);
  max-width: 100vw;
  padding: 0.5rem;
}
</style>
