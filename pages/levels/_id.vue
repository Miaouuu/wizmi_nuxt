<template>
  <div class="container wizmi-level-container gap-4 mt-4">
    <h1>Niveaux</h1>
    <div class="flex gap-4">
      <a
        v-for="i in 4"
        :key="i"
        :href="`/levels/${i}`"
        class="level-tag cursor-pointer"
        :class="$route.path === `/levels/${i}` ? 'bg-F2B138'  : 'bg-00000035'"
      >
        <p>Niveau 1-{{ i }}</p>
      </a>
    </div>
    <square-level />
    <!-- <Square v-if="level.type === 'SQUARE'" /> -->
  </div>
</template>

<script lang="ts">
import { Component, ProvideReactive, Vue } from 'nuxt-property-decorator'
import { Levels } from 'wizmi'
import SquareLevel from '@/components/Levels/Square/SquareLevel.vue'

@Component({
  components: {
    SquareLevel
  }
})
export default class LevelsPage extends Vue {
  @ProvideReactive() level = {
    data: {}
  } as Levels

  layout () {
    return 'base'
  }

  async mounted () {
    await this.getLevel()
  }

  async getLevel () {
    const id: string = this.$route.params.id
    const level: Levels = await this.$api.levels.getLevelById(id)
    this.level = level
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

p {
  margin: 0;
}

.wizmi-level-container{
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  height: 100%;
}

.level-tag {
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: #fff;
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

.mt-4 {
  margin-top: 1rem;
}
</style>
