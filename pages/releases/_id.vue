<template>
  <div>
    <h2>{{ release.title }}</h2>
    <div v-for="changelog in release.changelogs" :key="changelog.id">
      <hr>
      <h4>{{ changelog.title }}</h4>
      <div v-html="$md.render(changelog.description)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Releases } from 'wizmi'

@Component
export default class ReleaseWithChangelogsPage extends Vue {
  release: Releases = {
    id: 1,
    title: '',
    changelogs: [],
    createdAt: ''
  }

  layout () {
    return 'wizmi-base'
  }

  async mounted () {
    await this.getReleaseWithChangelogs()
  }

  async getReleaseWithChangelogs () {
    const id: string = this.$route.params.id
    const release: Releases = await this.$api.releases.getReleaseWithChangelogs(id)
    this.release = release
  }
}
</script>
