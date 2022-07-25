<template>
  <div class="container">
    <div class="flex header justify-between">
      <div class="flex flex-1">
        <SearchBar />
      </div>
      <div class="flex gap-2">
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

  .nav-section {
    display: flex;
    width: 100%;
  }
  .nav-link {
    display: flex;
    align-items: center;
    height: 3rem;

    padding: 0 0.5em;
    color: #fff;
  }

  .register-button {
    background-color: #F2B138;
    border-radius: 12px;
    color: #fff;
    font-weight: bold;
  }

  a {
    text-decoration: none;
  }
}
</style>
