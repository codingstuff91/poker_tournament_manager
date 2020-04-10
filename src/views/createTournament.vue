<template>
  <div class="home">
    <Navbar />
    <NewTournament msg="Créer un nouveau tournoi" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import NewTournament from '@/components/NewTournament.vue'

export default {
  name: 'createTournament',
  components: {
    Navbar,
    NewTournament
  }
}
</script>
