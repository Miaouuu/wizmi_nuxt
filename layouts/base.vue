<template>
  <div class="layout-root">
    <Aside />
    <div class="flex-col flex-1 gap-8">
      <navbar />
      <Nuxt />
      <!-- <footer /> -->
    </div>
  </div>
</template>

<style scoped>
.layout-root {
  display: flex;
  gap: 3rem;
  min-height: calc(100vh - 5rem);
  max-width: 100vw;
  padding: 2.5rem;
}
</style>
