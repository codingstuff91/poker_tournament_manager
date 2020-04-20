<template>
    <div class="home">
    <nav>
        <div class="nav-wrapper">
            <a href="#!" class="brand-logo">Poker Manager</a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">  			
              <template v-if="login">
                <li><router-link to="/newTournament"><i class="material-icons left">add_circle</i> Nouveau tournoi</router-link></li>
                <li><router-link to="/tournaments"><i class="material-icons left">insert_chart</i> Liste des Tournois</router-link></li>
                <li><router-link to="#"><i class="material-icons left">account_circle</i> {{ nickName }}</router-link></li>
              </template>

              <template v-else>
                  <li><router-link to="/signup"><i class="material-icons left">person_add</i> Inscription</router-link></li>
                  <li><router-link to="/login"><i class="material-icons left">lock_open</i> Connexion</router-link></li>
              </template>
            </ul>
        </div>
    </nav>

  <ul class="sidenav" id="mobile-demo">
    <template v-if="login">
      <li><router-link to="#"><i class="material-icons left">account_circle</i> Bienvenue {{ nickName }}</router-link></li>
      <li><router-link to="/newTournament"><i class="material-icons left">add_circle</i> Nouveau tournoi</router-link></li>
      <li><router-link to="/tournaments"><i class="material-icons left">insert_chart</i> Liste des Tournois</router-link></li>
    </template>
    <template v-else>
      <li><router-link to="/signup"><i class="material-icons left">person_add</i> Inscription</router-link></li>
      <li><router-link to="/login"><i class="material-icons left">lock_open</i> Connexion</router-link></li>
    </template>
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
                
        axios.get(url + '/user', {
          headers : {
            'Authorization' : 'Bearer ' + token
          }
        }).then((response)=>{
          this.login = true
          this.nickName = response.data.nickName
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
<style scoped>
	@media screen and (min-width: 1000px){
		.brand-logo {
			left : 5%;
		}
		.nav-wrapper{
			background-color : #42970a;
		}
	}

	@media screen and (min-width: 200px){
		.nav-wrapper{
			background-color : #42970a;
		}
	}	
</style>