<template>
  <div class="home">
    <Navbar />
    <TournamentsList msg="Liste des tournois" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import TournamentsList from '@/components/TournamentsList.vue'

export default {
  name: 'Tournaments',
  components: {
    Navbar,
    TournamentsList
  }
}
</script>