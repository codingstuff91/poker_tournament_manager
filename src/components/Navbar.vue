<template>
    <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <nav>
        <div class="nav-wrapper">
            <a href="#!" class="brand-logo">Poker Manager</a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
                
                <li><router-link to="/">Accueil</router-link></li>
				
				<template v-if="login">
					<li><router-link to="#">Bienvenue {{ nickName }}</router-link></li>
                	<li><router-link to="/logout">Deconnexion</router-link></li>
				</template>

                <template v-else>
                    <li><router-link to="/signup">Inscription</router-link></li>
                    <li><router-link to="/login">Connexion</router-link></li>
                </template>
            </ul>
        </div>
    </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><router-link to="/">Accueil</router-link></li>
    <li><router-link to="/signup">Inscription</router-link></li>
    <li><router-link to="/login">Connexion</router-link></li>
  </ul>
  </div>
</template>

<script>
import { log } from 'util'

const axios = require('axios')
const url = "http://localhost:5000"

export default {
  name: 'Navbar',
  data(){
    return{
		login : false,
		nickName : ''
    }
  },
  methods :{
	getUserName(){
		if(localStorage.getItem('token') !== null) {
			const token = localStorage.getItem('token');
			console.log(token);
			
			axios.get(url + '/user', {
				headers : {
					'Authorization' : 'Bearer ' + token
				}
			}).then((response)=>{
				this.login = true
				this.nickName = response.data
			})
		}
	} 
  },
  async mounted(){

	await this.getUserName();
		
	var options = {
		hover : true,
		inDuration : 150,
		outDuration : 300
	}

	document.addEventListener('DOMContentLoaded', function() {
		var elems = document.querySelectorAll('.sidenav');
		var instances = M.Sidenav.init(elems, options);
	});
  }
}
</script>
