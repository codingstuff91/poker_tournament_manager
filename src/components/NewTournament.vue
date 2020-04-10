<template>
	<div class="container">
		<h1>{{ msg }}</h1>
			<div class="row">
				<form class="col s12">
					<div class="input-field col s12">
						<i class="material-icons prefix">date_range</i>
						<input id="icon_prefix" type="text" v-model="dateTime">
						<label for="icon_prefix">Date et heure début de tournoi :</label>
					</div>
					<div class="input-field col s12">
						<i class="material-icons prefix">add_location</i>
						<input id="icon_prefix" type="text" v-model="localization">
						<label for="icon_prefix">Adresse du tournoi :</label>
					</div>
					<div class="input-field col s12">
						<i class="material-icons prefix">group</i>
						<input id="icon_prefix" type="text" v-model="playersMaximum">
						<label for="icon_prefix">Nombre de joueurs maximum :</label>
					</div>
					<div class="input-field col s12">
						<i class="material-icons prefix">attach_money</i>
						<input id="icon_prefix" type="text" v-model="buyIn">
						<label for="icon_prefix">Buy-in (€) :</label>
					</div>
					<div class="input-field col s12">
						<i class="material-icons prefix">announcement</i>
						<textarea id="textarea1" class="materialize-textarea" v-model="description"></textarea>
						<label for="icon_prefix">Description (stack départ, structure, recaves, add-ons, etc...) :</label>
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
			dateTime : '',
			localization : '',
			playersMaximum : '',
			buyIn : '',
			description : '',
			completed : false,
			errors : {},
			tournament : {}
		}
	},
	methods:{
		getUserId(){

		},
		createTournament(){
			axios.post(url + '/tournament',{
				creator : this.creator,
				dateTime : this.dateTime,
				localization : this.localization,
				playersMaximumNumber : parseInt(this.playersMaximum),
				buyIn : parseInt(this.buyIn),
				description : this.description
			})
		}
	},
	mounted(){
		const url = "http://localhost:5000";

		if(token !== null) {

			axios.get(url + '/user', {
				headers : {
					'Authorization' : 'Bearer ' + token
				}
			}).then((response)=>{
				this.creator = response.data
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
