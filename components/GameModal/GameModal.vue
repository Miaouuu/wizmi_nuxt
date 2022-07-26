<template>
  <div v-if="isOpen" class="overlay cursor-pointer" @click="close()">
    <div class="modal" @click.stop.prevent>
      <div class="modal-header">
        <span
          :class="{
            'span-info': type === 'info',
            'span-success': type === 'success',
            'span-error': type === 'error',
          }"
        >
          <img v-if="type === 'info'" src="@/assets/icons/infos.svg">
          <img v-if="type === 'success'" src="@/assets/icons/success.svg">
          <img v-if="type === 'error'" src="@/assets/icons/error.svg">
        </span>
      </div>
      <div class="modal-content">
        <template v-if="type === 'info'">
          <div class="modal-content--title mb-4">Comment jouer ?</div>
          <p class="mb-4">Déplace les flèches dans la bannière qui se trouve en haut du plateau pour faire parvenir le personnage à l’arrivée. Tu n’es pas obligé d’utiliser toutes les flèches. Pour certains niveaux tu devras réfléchir en fonction des chiffres indiqués en dessous des flèches qui correspondent au nombre de cases que ton personnages parcourera.</p>
          <div class="modal-content--subtitle mb-8">Tu es prêt ?</div>
        </template>
        <template v-if="type === 'success'">
          <div class="modal-content--title">Bien joué !</div>
          <div class="modal-content--subtitle mb-4">{{ contentArray[0] }}</div>
          <p>{{ contentArray[1] }}</p>
        </template>
        <template v-if="type === 'error'">
          <div class="modal-content--title">Raté !</div>
          <div class="modal-content--subtitle mb-4">{{ contentArray[0] }}</div>
        </template>

        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class GameModal extends Vue {
  @Prop({ default: true }) readonly isOpen!: Boolean
  @Prop() readonly type!: String
  @Prop() readonly contentArray!: Array<String>

  @Emit()
  close () {
    return true
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.modal {
  position: absolute;
  z-index: 20;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  padding: 2rem;
  background-color: #fff;
  color: #262626;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  text-align: center;
  cursor: auto;
}

.mb-4 {
  margin-bottom: 1rem;
}
.mb-8 {
  margin-bottom: 2rem;
}

.modal-header {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: -5rem;

  .span-info, .span-success, .span-error {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    height: 140px;
    width: 140px;

  }

  .span-info {
    border: 10px solid #4181FF;
    background-color: #72C1F2;
    img{
      width: 75%;
      height: 75%;
    }
  }
  .span-success {
    border: 10px solid #24CB30;
    background-color: #8AFF43;
    img{
      width: 80%;
      height: 80%;
    }
  }
  .span-error {
    border: 10px solid #B42D02;
    background-color: #FF4D14;
    img{
      width: 70%;
      height: 70%;
    }
  }
}

.modal-content p {
  font-weight: 300;
}

.modal-content--title {
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
}

.modal-content--subtitle {
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
}
</style>
