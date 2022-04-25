<template>
  <div class="search-container">
    <input type="text" class="search-input">
    <div class="search-box-icon">
      <img src="../assets/icons/magnifying-glass-solid.svg" alt="search">
    </div>
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
  width: 16rem;
  height: 3rem;
  padding: 0.5rem;
  border-bottom: 1px solid #fff;
  .search-input{
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
  }
  .search-input:focus{
    outline: none;
  }

  .serch-box-icon{
    width: 3rem;
    height: 3rem;
    background-color: transparent;
    border: none;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
