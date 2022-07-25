<template>
  <div class="aside-body">
    <NuxtLink to="/" class="nav-link border-b-fff">
      <img src="../assets/logo-white.svg" alt="Wizmi" class="logo">
    </NuxtLink>
    <div class="aside-container">
      <NuxtLink to="/worlds" class="nav-link">
        <img src="../assets/globe.svg" alt="Levels page" class="aside-link">
      </NuxtLink>
      <NuxtLink to="/levels/1" class="nav-link">
        <img src="../assets/gaming.svg" alt="Game pages" class="aside-link">
      </NuxtLink>
    </div>
    <div class="aside-footer">
      <NuxtLink to="/" class="nav-link border-t-fff">
        <img src="../assets/exit.svg" alt="Exits" class="aside-link">
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'nuxt-property-decorator'

export default class Aside extends Vue {}
</script>

<style lang="scss" scoped>
.aside-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5em;
  border-radius: 20px;
  background: #F2B138;
  color: #fff;
}

.aside-container {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding-top: 4em;
  align-items: center;
}

.aside-footer {
  display: flex;
  flex-direction: column;
  width: 100%;
  .aside-link {
    padding-top: 4px;
    margin: 0 auto;
    width: 28px;
  }
}

.aside-link {
  width: 40px;
}

.border-b-fff{
  border-bottom: 1px solid #fff;
}

.border-t-fff{
  border-top: 1px solid #fff;
}

.logo {
  width: 80px;
  padding: 4px 0px 8px 0px;
  height: fit-content;
  height: auto;
}

.nav-link{
  height: 60px;
  display: flex;
  cursor: pointer;
}
</style>