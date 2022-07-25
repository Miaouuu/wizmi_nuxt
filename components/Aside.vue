<template>
  <div class="aside-body">
    <NuxtLink to="/" class="nav-link border-b-fff">
      <img src="../assets/logo-white.svg" alt="Wizmi" class="logo">
    </NuxtLink>
    <div class="aside-container flex-1">
      <div class="aside-links">
        <NuxtLink to="/worlds" class="relative nav-link">
          <img src="../assets/icons/globe.svg" alt="Levels page" class="aside-link">
          <span v-if="$route.path === '/worlds'" class="blue-dot" />
        </NuxtLink>
        <NuxtLink to="/levels/1" class="relative nav-link">
          <img src="../assets/icons/gaming.svg" alt="Game pages" class="aside-link">
          <span v-if="$route.path.includes('/levels/')" class="blue-dot" />
        </NuxtLink>
      </div>
      <div class="aside-footer">
        <NuxtLink to="/" class="nav-link border-t-fff">
          <img src="../assets/icons/exit.svg" alt="Exits" class="aside-link">
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'nuxt-property-decorator'

export default class Aside extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/css/variables";
.aside-body {
  display: flex;
  flex-direction: column;
  padding: 0.5em;
  border-radius: 16px;
  background: #F2B138;
  color: #fff;
}

.aside-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 2.5em;
  align-items: center;
}

.aside-links {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
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
  padding: 12px 0px 16px 0px;
  height: fit-content;
  height: auto;
}

.blue-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 2px);
  background-color: $light-blue;
  border-radius: 50%;
}

.nav-link{
  height: 60px;
  display: flex;
  cursor: pointer;
}
</style>
