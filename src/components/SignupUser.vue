<template>
  <div class="container">
    <h1>{{ msg }}</h1>
      <div class="row">
        <form class="col s12">
            <div class="input-field col s12">
              <i class="material-icons prefix">account_circle</i>
              <input id="icon_prefix" type="text" v-model="nickName">
              <label for="icon_prefix">Votre pseudonyme :</label>
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">account_circle</i>
              <input id="icon_prefix" type="text" v-model="firstName">
              <label for="icon_prefix">Votre prenom :</label>
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">contact_mail</i>
              <input id="icon_prefix" type="text" v-model="email">
              <label for="icon_prefix">Adresse mail :</label>
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">vpn_key</i>
              <input id="icon_telephone" type="password" v-model="password">
              <label for="icon_telephone">Mot de passe :</label>
              <p v-if="errors.password">{{errors.password}}</p>
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">vpn_key</i>
              <input id="icon_telephone" type="password" v-model="confirm_password">
              <label for="icon_telephone">Confirmation du mot de passe :</label>
              <p v-if="errors.password">{{errors.password}}</p>
            </div>
            <div class="row">
              <button class="btn waves-effect waves-light" type="submit" @click.prevent="register">Enregistrement
                  <i class="material-icons right">send</i>
              </button>
            </div>
        </form>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'SignupUser',
  props: {
    msg: String
  },
  data(){
    return {
      nickName : '',
      firstName : '',
      email : '',
      password : '',
      confirm_password : '',
      errors : {}
    }
  },
  methods:{
    checkPasswords(){
      //check the passwords 
      if(this.confirm_password != this.password) {
        this.$set(this.errors,'password','The password dont match');
        return false;
      }
    },
    async register(){
      
      await this.checkPasswords();
      
      axios.post('http://localhost:5000/users',{
        firstName : this.firstName,
        nickName : this.nickName,
        email : this.email,
        password : this.password
      }).then((response) => {
        Swal.fire({
          title: 'Succes',
          text: 'Compte utilisateur crée avec succès !',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          this.$router.push('Home')                   
        })
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
