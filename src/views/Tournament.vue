<template>
  <div class="home">
    <Navbar />
    <h1>Détails du tournoi</h1>
    <div class="row">
        <h2>Organisateur du tournoi :</h2>
        <p>{{ creator }}</p>
        <h2>Date et heure :</h2>
        <p>{{ dateTime }}</p>
        <h2>Lieu du tournoi :</h2>
        <p>{{ localization }}</p>
        <h2>Buy In :</h2>
        <p>{{ buyIn }}</p>
        <h2>Recaves :</h2>
        <p>{{ rebuy }}</p>
        <h2>Durée des niveaux :</h2>
        <p>{{ levelDuration }} minutes</p>
        <h2>Description complémentaire :</h2>
        <p>{{ description }}</p>
        <h2>Nombre de joueurs maximum :</h2>
        <p>{{ playersMaximumNumber }}</p>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import axios from 'axios';
const url = "http://localhost:5000/tournament/";

export default {
  name: 'Tournament',
  components: {
    Navbar
  },
  data() {
      return{
        creator : '',
        dateTime : '',
        localization : '',
        description : '',
        levelDuration : '',
        buyIn : '',
        rebuy : '',
        playersMaximumNumber : ''
      }
  },
  methods : {
    getTournamentDetails() {
        const tournament_id = this.$route.params.id;

        axios.get(url + tournament_id).then((response)=>{
            this.creator = response.data.res.creator,
            this.dateTime = response.data.res.dateTime,
            this.localization = response.data.res.localization,
            this.description = response.data.res.description,
            this.levelDuration = response.data.res.level_duration,
            this.buyIn = response.data.res.buyIn,
            this.rebuy = response.data.res.rebuy,
            this.playersMaximumNumber = response.data.res.playersMaximumNumber
        })
    }
  },
  created() {
      this.getTournamentDetails()
  }
}
</script>
<style scoped>
h2{
    font-size: 18px;
}

</style>