<template>
    <div class="container">
        <h1>{{ msg }}</h1>
        <div class="row">
            <div class="col s12">
                <img src="../assets/poker-chips.png" class="responsive-img">
                <h5>Tournois à venir</h5>
                <p>Voici la liste des tournois ou vous pouvez vous inscrire</p>
                <table>
                    <thead>
                    <tr>
                        <th><i class="material-icons">person</i> Organisateur</th>
                        <th><i class="material-icons prefix">access_time</i> Date et heure</th>
                        <th><i class="material-icons prefix">add_location</i> Lieu</th>
                        <th><i class="material-icons prefix">attach_money</i> Buy-in</th>
                        <th> Inscription</th>
                    </tr>
                    </thead>

                    <tbody v-for="tournament in nextTournaments" :key="tournament._id">
                        <tr>
                            <td>{{ tournament.creator }}</td>
                            <td>{{ tournament.dateTime }}</td>
                            <td>{{ tournament.localization }}</td>
                            <td>{{ tournament.buyIn }}€</td>
                            <td><router-link :to="{ name: 'tournament', params: { id: tournament._id } }">Détails / inscriptions</router-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="col s12">
                <img src="../assets/classment-tournoi.jpg" class="responsive-img">
                <h5>Tournois terminés</h5>
                <p>Voici la liste des tournois qui ont eu lieu. Cliquez sur un tournoi pour voir le classement</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
const url = "http://localhost:5000/tournaments";

export default {
    name: 'TournamentsList',
    props: {
        msg: String
    },
    data(){
        return {
            nextTournaments : [],
            finishedTournaments : []
        }
    },
    methods:{
        getNextTournaments() {
            axios.get(url).then((response)=>{
                this.nextTournaments = response.data.res
            })
        },
        getFinishedTournaments() {

        }
    },
    mounted(){
        this.getNextTournaments();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
    width : 200px;
    height : 200px;
}
table{
        margin-bottom: 5%;
}
</style>
