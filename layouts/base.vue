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
  padding: 8px;
}
</style>
