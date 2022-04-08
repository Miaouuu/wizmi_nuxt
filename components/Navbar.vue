<template>
  <div class="container">
    <div class="flex header justify-between">
      <div class="flex">
        <NuxtLink to="/" class="nav-link">
          <img src="../assets/logo.svg" alt="Wizmi" class="logo">
        </NuxtLink>
        <NuxtLink to="/worlds" class="nav-link">
          Worlds
        </NuxtLink>
        <NuxtLink to="/levels/1" class="nav-link">
          Levels
        </NuxtLink>
      </div>
      <div class="flex">
        <SearchBar />
      </div>
      <div class="flex">
        <NuxtLink to="/account/login" class="nav-link">
          Login
        </NuxtLink>
        <NuxtLink to="/account/register" class="nav-link register-button">
          Register
        </NuxtLink>
      </div>
    </div>
    <div />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SearchBar from './SearchBar.vue'

@Component({
  components: {
    SearchBar
  }
})
export default class Navbar extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/css/variables";

.header {
  display: flex;
  padding: 2rem 0 2.5rem;

  .nav-section {
    display: flex;
    width: 100%;
  }
  .logo {
    width: 100px;
    height: auto;
  }
  .nav-link {
    display: flex;
    align-items: center;

    padding: 0 8px;
    color: #fff;
  }
  .nav-link:first-child {
    padding: 0 16px 0 0;
  }

  .register-button {
    padding: 8px 16px;
    background-color: white;
    border-radius: 4px;
    color: $blue;
  }

  a {
    text-decoration: none;
  }
}
</style>
