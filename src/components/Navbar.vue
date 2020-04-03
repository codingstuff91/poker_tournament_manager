<template>
    <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <nav>
        <div class="nav-wrapper">
            <a href="#!" class="brand-logo">Poker Manager</a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
                
                <li><router-link to="/">Accueil</router-link></li>

                <li v-if="login"><router-link to="/logout">Deconnexion</router-link></li>

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
import jwt from 'jsonwebtoken'

export default {
  name: 'Navbar',
  data(){
    return{
        login : false,
    }
  },
  methods : {
    checkToken(){                
        if(localStorage.getItem('token') !== null) {
            this.login = true
        }
    }
  },
  mounted(){

  this.checkToken();
    
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
