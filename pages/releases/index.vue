<template>
  <div>
    <h1>Page Release</h1>
    <div>
      <div v-for="release in releases" :key="release.id">
        <p>{{ release.title }}</p>
        <NuxtLink :to="`/releases/${release.id}`">
          Voir plus ...
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Releases } from 'wizmi'

@Component
export default class ReleasesPage extends Vue {
  releases: Releases[] = []

  layout () {
    return 'base'
  }

  async mounted () {
    await this.getReleases()
  }

  async getReleases () {
    const releases: Releases[] = await this.$api.releases.getReleases()
    this.releases = releases
  }
}
</script>
