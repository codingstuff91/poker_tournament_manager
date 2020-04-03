<template>
  <div class="container">
    <h1>{{ msg }}</h1>
      <div class="row">
        <form class="col s12">
            <div class="input-field col s12">
            <i class="material-icons prefix">contact_mail</i>
            <input id="icon_prefix" type="text" v-model="email">
            <label for="icon_prefix">Adresse mail :</label>
            </div>
            <div class="input-field col s12">
            <i class="material-icons prefix">vpn_key</i>
            <input id="icon_telephone" type="password" v-model="password">
            <label for="icon_telephone">Mot de passe :</label>
            </div>
            <button class="btn waves-effect waves-light" type="submit" @click.prevent="login">Connexion
                <i class="material-icons right">send</i>
            </button>
        </form>
      </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'LoginUser',
  props: {
    msg: String
  },
  data(){
    return{
      email : '',
      password : ''
    }
  },
  methods : {
    login(){
      axios.post('http://localhost:5000/users/login',{
          email : this.email,
          password : this.password
      }).then((response) => {
        
        //store the token in localStorage
        localStorage.setItem('token',response.data.res.jwt_token);

        Swal.fire({
          title: 'Succes',
          text: 'Vous etes maintenant connecté',
          icon: 'success',
          confirmButtonText: 'OK'
        })

        this.$router.push({name : 'Home'})

      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,h3 {
  margin: 20px 0 0;
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
