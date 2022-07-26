<template>
  <div class="flex flex-col flex-1 container gap-4 mt-4">
    <h1>Découvrez les différents mondes</h1>
    <div class="flex gap-4">
      <div v-for="i in 4" :key="i" class="world-tag" :class="i === 1 ? 'bg-F2B138 cursor-pointer' : 'bg-00000035 cursor-deny'">
        <p>Monde {{ i }}</p>
      </div>
    </div>
    <div class="relative flex flex-1 world-map">
      <WorldHorizontalScroller :worlds="worlds" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'nuxt-property-decorator'
import { Worlds } from 'wizmi'
import WorldHorizontalScroller from '@/components/WorldsStepper/WorldHorizontalScroller.vue'

@Component({
  components: {
    WorldHorizontalScroller
  }
})
export default class WorldsPage extends Vue {
  @Provide() worlds: Worlds[] = []

  layout () {
    return 'base'
  }

  async mounted () {
    await this.getWorlds()
  }

  async getWorlds () {
    const worlds: Worlds[] = await this.$api.worlds.getWorlds()
    this.worlds = worlds
  }
}
</script>

<style lang="scss" scoped>
h1 {
  letter-spacing: 2px;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
}

.world-map {
  background-image: url('../assets/icons/undraw_connected_world_way_1.svg');
  background-repeat: no-repeat, repeat;
  background-position: center;
}

.world-tag {
  padding: 8px 16px;
  border-radius: 8px;
  p {
    margin: 0;
  }
}

.bg-F2B138 {
  background-color: #F2B138;
}

.bg-00000035 {
  background-color: #00000035;
}

.bottom-0{
  bottom: 0;
}

.mt-4 {
  margin-top: 1rem;
}
</style>
