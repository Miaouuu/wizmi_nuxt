<template>
  <div>
    <h1>Faire un feedback</h1>
    <form class="wizmi-form" @submit.prevent="submitFeedback">
      <div class="wizmi-form-group">
        <label class="wizmi-label" for="title">Title</label>
        <input v-model="feedback.title" type="text" name="title">
      </div>

      <div class="wizmi-form-group">
        <label class="wizmi-label" for="description">Description</label>
        <textarea v-model="feedback.description" name="description" />
      </div>

      <button class="wizmi-button-primary">
        Envoyer
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CreateFeedbackInput } from 'wizmi'

@Component
export default class FeedbackPage extends Vue {
  feedback: CreateFeedbackInput = {
    title: '',
    description: ''
  }

  layout () {
    return 'wizmi-base'
  }

  resetFeedbackForm () {
    this.feedback.title = ''
    this.feedback.description = ''
  }

  async submitFeedback () {
    if (this.feedback.title || this.feedback.description) {
      try {
        await this.$api.feedbacks.postFeedback(this.feedback)
        this.resetFeedbackForm()
      } catch {
        this.resetFeedbackForm()
      }
    }
  }
}
</script>
