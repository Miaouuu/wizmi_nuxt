<template>
  <div>
    <div v-for="feedback in feedbacks" :key="feedback.id" style="border: 1px solid black;">
      <p>{{ feedback.title }}</p>
      <p>{{ feedback.description }}</p>
      <button @click="validateFeedback(feedback.id)">
        Valider
      </button>
      <button @click="deleteFeedback(feedback.id)">
        Supprimer
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Feedbacks } from 'wizmi'

@Component({
  middleware: ['admin']
})
export default class FeedbacksAdminPage extends Vue {
  feedbacks: Feedbacks[] = []

  layout () {
    return 'base'
  }

  async mounted () {
    await this.getFeedbacks()
  }

  async getFeedbacks () {
    try {
      const feedbacks: Feedbacks[] = await this.$api.feedbacks.getFeedbacks()
      this.feedbacks = feedbacks
    } catch {
      console.error('i')
    }
  }

  async validateFeedback (id: number) {
    try {
      await this.$api.feedbacks.validateFeedback(id)
      this.getFeedbacks()
    } catch {
      console.error('i')
    }
  }

  async deleteFeedback (id: number) {
    try {
      await this.$api.feedbacks.deleteFeedback(id)
      this.getFeedbacks()
    } catch {
      console.error('i')
    }
  }
}
</script>
