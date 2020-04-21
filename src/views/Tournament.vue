<template>
  <div class="home">
    <Navbar />
    <h1>Détails et inscription</h1>
    <div class="row">
      <div class="col s12">
        <ul class="tabs">
          <li class="tab col s6"><a class="active" href="#details">DETAILS DU TOURNOI</a></li>
          <li class="tab col s6"><a href="#inscription">JOUEURS INSCRITS</a></li>
        </ul>
      </div>
      <div id="details" class="col s12">
        <h2><span class="title">Organisateur du tournoi : </span>{{ creator }}</h2>
        <h2><span class="title">Date et heure : </span>{{ dateTime }}</h2>
        <h2><span class="title">Lieu du tournoi : </span>{{ localization }}</h2>
        <h2><span class="title">Nombre de joueurs maximum : </span>{{ playersMaximumNumber }}</h2>
        <h2><span class="title">Buy In : </span>{{ buyIn }}€</h2>
        <h2><span class="title">Recaves : </span>{{ rebuy }}</h2>
        <h2><span class="title">Durée des niveaux : </span>{{ levelDuration }} minutes</h2>
        <h2><span class="title">Description complémentaire : </span>{{ description }}</h2>
      </div>
      <div id="inscription" class="col s12">
        <a class="waves-effect waves-light btn" @click="tournamentRegister" style="margin-top : 20px;"><i class="material-icons left">person_add</i>Vous inscrire au tournoi</a>
        <h2>Joueurs inscrits :</h2>
        <ul v-for="player in playersRegistered" :key="player.nickName">
          <li>{{ player.nickName }}</li>
        </ul>
      </div>
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
        playersMaximumNumber : '',
        playersRegistered : [],
        numberPlayersRegistered : ''
      }
  },
  methods : {
    async getTournamentDetails() {
      const tournament_id = this.$route.params.id;

      await axios.get(url + tournament_id).then((response)=>{
          this.creator = response.data.res.creator,
          this.dateTime = response.data.res.dateTime,
          this.localization = response.data.res.localization,
          this.description = response.data.res.description,
          this.levelDuration = response.data.res.level_duration,
          this.buyIn = response.data.res.buyIn,
          this.rebuy = response.data.res.rebuy,
          this.playersMaximumNumber = response.data.res.playersMaximumNumber

          response.data.res.playersRegistered.forEach(element => {
            this.playersRegistered.push(JSON.parse(element))
          });
      });
    },
    tournamentRegister() {
      alert('click')
    }
  },
  created() {
    this.getTournamentDetails();
  },
  mounted() {
    //initialization of the materialize tab component
    const options = {
      duration : 400
    }
    const el = document.querySelector('.tabs');
    var instance = M.Tabs.init(el, options);
  }
}
</script>
<style scoped>
h2{
    font-size: 18px;
}
.title{
  color: #42970a;
  font-style: oblique;
  font-weight: bold;
}

</style>