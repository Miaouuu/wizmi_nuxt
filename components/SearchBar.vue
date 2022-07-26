<template>
  <div class="search-container flex-1">
    <div class="search-box-icon">
      <img src="../assets/icons/magnifying-glass-solid.svg" alt="search">
    </div>
    <input type="text" class="search-input" placeholder="RECHERCHE...">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class SearchBar extends Vue {
}
</script>

<style scoped lang="scss">
.search-container{
  display: flex;
  align-items: center;
  width: 50%;
  max-width: 24rem;
  height: 2.5rem;
  padding: 0.25rem 1rem;
  color: #fff;
  align-items: center;
  background-color: #F2B138;
  border-radius: 12px;
  gap: 8px;
  font-family: "Inter", sans-serif;
  .search-input{
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    text-transform: capitalize;
    color: #fff;
    font-size: 12px;
  }
  .search-input:focus{
    outline: none;
  }
  .search-input::placeholder{
    color: #fff;
  }
  .search-box-icon{
    display: flex;
    background-color: transparent;
    border: none;
    align-items: center;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
