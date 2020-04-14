<template>
	<div class="container">
		<h1>{{ msg }}</h1>
			<div class="row">
				<form class="col s12">
					<div class="input-field">
						<i class="material-icons prefix">date_range</i>
						<input type="text" id="dateTime" class="datepicker" v-model.lazy="date">
						<label for="dateTime">Date du tournoi :</label>
					</div>
					<div class="input-field">
						<i class="material-icons prefix">access_time</i>
						<input type="text" id="time" class="timepicker" v-model.lazy="time">
						<label for="time" class="active">Début du tournoi :</label>
					</div>
					<div class="input-field">
						<i class="material-icons prefix">add_location</i>
						<input id="localization" type="text" v-model="localization">
					</div>
					<div class="input-field">
						<i class="material-icons prefix">group</i>
						<input id="playersMaximum" type="text" v-model="playersMaximum">
						<label for="playersMaximum">Nombre de joueurs maximum :</label>
					</div>
					<div class="input-field">
						<i class="material-icons prefix">attach_money</i>
						<input id="buyIn" type="text" v-model="buyIn">
						<label for="buyIn">Buy-in (€) :</label>
					</div>
					<div class="input-field">
						<i class="material-icons prefix">attach_money</i>
						<input id="rebuy" type="text" v-model="rebuy">
						<label for="rebuy">Recaves :</label>
					</div>
					<div class="input-field">
						<i class="material-icons prefix">access_time</i>
						<input id="levelDuration" type="text" v-model="levelDuration">
						<label for="levelDuration">Durée des niveaux (en minutes):</label>
					</div>
					<div class="input-field">
						<i class="material-icons prefix">announcement</i>
						<textarea id="description" class="materialize-textarea" v-model="description"></textarea>
						<label for="description">Description complémentaire (stack départ, type de tournoi etc...) :</label>
					</div>
					<div class="row">
						<button class="btn waves-effect waves-light" type="submit" @click.prevent="createTournament">Creer ce tournoi
							<i class="material-icons right">add_box</i>
						</button>
					</div>			
				</form>
			</div>
	</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

const token = localStorage.getItem('token');
const url = "http://localhost:5000"

export default {
	name: 'newTournament',
	props: {
		msg: String
	},
	data(){
		return {
			creator : '',
			date : '',
			time : '21:00',
			localization : '',
			playersMaximum : '',
			buyIn : '',
			rebuy : '',
			levelDuration : '',
			description : '',
			completed : false,
			errors : {},
		}
	},
	computed : {
		dateTime : function(){
			return this.date + " à " + this.time
		}
	},
	methods:{
		createTournament(){
			axios.post(url + '/tournament',{
				creator : this.creator,
				localization : this.localization,
				dateTime : this.dateTime,
				time : this.time,
				localization : this.localization,
				playersMaximumNumber : parseInt(this.playersMaximum),
				buyIn : parseInt(this.buyIn),
				description : this.description,
				rebuy : this.rebuy,
				level_duration : parseInt(this.levelDuration)
			}).then(()=>{
				Swal.fire({
					title: 'Succes',
					text: 'Le tournoi a été crée',
					icon: 'success',
					confirmButtonText: 'OK'
				})
			}).catch((error)=>{
				Swal.fire({
					title: 'Erreur',
					text: 'Il manque des informations pour créer ce tournoi',
					icon: 'error',
					confirmButtonText: 'OK'
				})				
			})
		}
	},
	mounted(){
		document.addEventListener('DOMContentLoaded', function() {

			const dateOptions = {
				format : "dd-mm-yyyy",
				autoclose : true
			}

			const timeOptions = {
				twelveHour : false,
			}

			var elems = document.querySelectorAll('.datepicker');
			var instances = M.Datepicker.init(elems, dateOptions);

			var elems = document.querySelectorAll('.timepicker');
			var instances = M.Timepicker.init(elems, timeOptions);

		});
		const url = "http://localhost:5000";

		if(token !== null) {

			axios.get(url + '/user', {
				headers : {
					'Authorization' : 'Bearer ' + token
				}
			}).then((response)=>{
				console.log(response.data)
				this.creator = response.data.nickName
				this.localization = response.data.localization
			})
		}		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
