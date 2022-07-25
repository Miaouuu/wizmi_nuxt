<template>
  <div class=" flex flex-col flex-1 container flex-1 gap-8">
    <div class="flex flex-1 gap-8">
      <div class="relative flex cursor-pointer">
        <img src="../assets/images/coding.png" alt="A computer screen with code" style="width: 50vw;">
        <div class="image-content absolute bottom-0 left-0">
          <h1>
            Wizmi
          </h1>
          <p>
            L'univers de la programation
          </p>
        </div>
      </div>
      <div class="flex flex-1 flex-col gap-2">
        <h3>
          Nouveautés
        </h3>
        <div class="new--card flex-1 cursor-pointer">
          <img src="../assets/icons/starred-eyes-emoji.svg" alt="A stared eyes emoji">
          <span>
            Monde 5 disponible
          </span>
        </div>
        <div class="new--card flex-1 cursor-pointer">
          <img src="../assets/icons/heart-eyes-emoji.svg" alt="A heart eyes emoji">
          <span>
            Nouveaux niveaux
          </span>
        </div>
        <div class="new--card flex-1 cursor-pointer">
          <img src="../assets/icons/airdrop.svg" alt="An air dropped crate">
          <span>
            Corrections bugs
          </span>
        </div>
        <div class="new--card flex-1 cursor-pointer">
          <img src="../assets/icons/social.svg" alt="Two people">
          <span>
            Nos réseaux sociaux
          </span>
        </div>
      </div>
    </div>
    <div class="flex flex-col flex-1 justify-between gap-8">
      <h2>
        Apprendre la programmation en s'amusant
      </h2>
      <div class="flex flex-1 gap-8">
        <div class="card relative flex flex-col flex-1 cursor-pointer">
          <p class="card-title">
            Découvir
          </p>
          <p class="card-content">
            Découvrir l’univers de la programmation grâce à Wizmi.
          </p>
          <p class="card-number card-number-1">1</p>
        </div>
        <div class="card relative flex flex-col flex-1 cursor-pointer">
          <p class="card-title">
            S'éxercer
          </p>
          <p class="card-content">
            S’exercer grâce à de multiples niveaux.
          </p>
          <p class="card-number">
            2
          </p>
        </div>
        <div class="card relative flex flex-col flex-1 cursor-pointer">
          <p class="card-title">
            Apprendre
          </p>
          <p class="card-content">
            Apprendre les différents termes techniques et leurs fonctionnalités.
          </p>
          <p class="card-number">
            3
          </p>
        </div>
        <div class="card relative flex flex-col flex-1 cursor-pointer">
          <p class="card-title">
            S'améliorer
          </p>
          <p class="card-content">
            Recommencer les niveaux pour mieux comprendre et pour s’améliorer
          </p>
          <p class="card-number">
            4
          </p>
        </div>
        <div class="card relative flex flex-col flex-1 cursor-pointer">
          <p class="card-title">
            S'amuser
          </p>
          <p class="card-content">
            Apprendre en s’amusant c’est que nous proposons grâce à nos jeux.
          </p>
          <p class="card-number">
            5
          </p>
        </div>
      </div>
      <div class="new-members gap-2">
        <span>
          Ils rejoignent la plateforme :
        </span>
        <div class="flex justify-between">
          CUISTOTO - GRATIN - LOCKEV - RUBEN - COLLIN - KEM - GERMO - RIX - SILENT - SPONK - SLYNE - CAMARA - BAKARY
          <img src="../assets/icons/arrow-right.svg" style="width: 20px" class="cursor-pointer"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {
  layout () {
    return 'base'
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 5rem;
  font-weight: bold;
  margin: 0;
}

h2 {
  letter-spacing: 2px;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
}

h3 {
  margin-top: 0;
  font-size: 32px;
  letter-spacing: 2px;
}

p {
  margin: 0
}

.image-content{
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;

  p {
    color: #F6A228;
    margin-left: 6px;
  }
}

.new--card{
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 8px 24px;
  background-color: #fff;
  color: #262626;
  border-radius: 12px;
  font-weight: bold;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  img{
    color: #F2B138;
    width: 40px;
  }
}

.card {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  color: #262626;
  padding: 24px 16px;
  border-radius: 16px;
  gap: 16px;
  .card-title {
    font-weight: 700;
    font-size: 20px;
  }
  .card-content {
    text-align: center;
    font-weight: 300;
    font-size: 16px;
  }
  .card-number{
    position: absolute;
    left: -5%;
    bottom: -18px;
    font-size: 80px;
    font-weight: 700;
    color: #F6A228;
    margin-top: 10%;
  }
  .card-number-1 {
    left: -20px;
  }
}

.new-members {
  display: flex;
  flex-direction: column;
  background-color: #F2B138;
  color: #262626;
  letter-spacing: 2px;
  padding: 16px 24px;
  border-radius: 16px;
  font-weight: 300;
  span {
    text-transform: uppercase;
    font-size: 20px;
    color: #fff;
    font-weight: 700;
  }
}

.bottom-0 {
  bottom: 0;
}
.left-0 {
  left: 0;
}

</style>
