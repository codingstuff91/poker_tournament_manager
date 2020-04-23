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
        <a class="waves-effect waves-light btn green darken-2" v-if="!alreadyRegistered" @click="tournamentRegister(nickName)" style="margin-top : 20px;"><i class="material-icons left">person_add</i>Vous inscrire au tournoi</a>
        <a class="waves-effect waves-light btn red darken-1" v-else @click="tournamentUnregister(nickName)" style="margin-top : 20px;"><i class="material-icons left">remove_circle</i>Se désinscrire</a>
        <h2 class="title">{{ numberPlayersRegistered }} Joueurs inscrits :</h2>
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
import Swal from 'sweetalert2';

const serverUrl = "http://localhost:5000/tournament";

export default {
  name: 'Tournament',
  components: {
    Navbar
  },
  data() {
      return{
        nickName : '',
        tournamentId : '',
        creator : '',
        dateTime : '',
        localization : '',
        description : '',
        levelDuration : '',
        buyIn : '',
        rebuy : '',
        playersMaximumNumber : '',
        playersRegistered : [],
        numberPlayersRegistered : 0,
        alreadyRegistered : false
      }
  },
  methods : {
    //Display the tournament details
    async getTournamentDetails() {
      const tournament_id = this.$route.params.id;

      await axios.get(serverUrl + "/" + tournament_id).then((response)=>{
          this.creator = response.data.res.creator,
          this.dateTime = response.data.res.dateTime,
          this.localization = response.data.res.localization,
          this.description = response.data.res.description,
          this.levelDuration = response.data.res.level_duration,
          this.buyIn = response.data.res.buyIn,
          this.rebuy = response.data.res.rebuy,
          this.playersMaximumNumber = response.data.res.playersMaximumNumber

          this.playersRegistered = response.data.res.playersRegistered

          this.playersRegistered.forEach(player => {
            this.numberPlayersRegistered ++;
          });
      });
    },
    // Register a player to the tournament
    tournamentRegister(nickName) {
      axios.put(serverUrl,{
        nickName : this.nickName,
        tournamentId : this.tournamentId
      }).then((response)=>{
        
        this.numberPlayersRegistered = 0;

        this.getTournamentDetails();
        
        this.alreadyRegistered = true;

        Swal.fire({
          title: 'Succes',
          text: 'Vous etes maintenant inscrit',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      })
    },
    // Unregister a player of the tournament
    tournamentUnregister(nickName, tournamentId) {
      axios.put(`${serverUrl}/${this.tournamentId}/${nickName}`,{
        tournamentId : this.tournamentId
      }).then((response)=>{

        this.numberPlayersRegistered = 0;

        this.getTournamentDetails();
        
        this.alreadyRegistered = false;

        Swal.fire({
          title: 'Succes',
          text: 'Votre inscription a été supprimée',
          icon: 'success',
          confirmButtonText: 'OK'
        })        
      })
    },
    // Check if the user is already registered for switching the call to action button
    checkUserRegistration(nickName) {
      const searchUserRegistration = this.playersRegistered.filter((player)=>{
        return player.nickName == nickName
      })

      this.alreadyRegistered = searchUserRegistration.length != 0 ? true : false;
    }
  },
  async mounted() {
    // Get the tournament Id
    this.tournamentId = this.$route.params.id

    //initialization of the materialize tab component
    const options = {
      duration : 400
    }
    const el = document.querySelector('.tabs');
    var instance = M.Tabs.init(el, options);

    //get the current user 
    const token = localStorage.getItem('token');
		const fetchUserUrl = "http://localhost:5000/user";

		if(token !== null) {

			axios.get(fetchUserUrl, {
				headers : {
					'Authorization' : 'Bearer ' + token
				}
			}).then((response)=>{
				this.nickName = response.data.nickName
			})
    }
    // Call other methods
    await this.getTournamentDetails();
    await this.checkUserRegistration(this.nickName);
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