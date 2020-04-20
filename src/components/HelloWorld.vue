<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <h3>Cette application vous permet de :</h3>

    <div class="row">
      <div class="col s12 m12 l4 xl4">
        <i class="large material-icons">face</i>
        <h5 class="center-align">Inscription des joueurs aux tournois</h5>
        <p class="left-align">Facilite l'inscription des joueurs aux différents tournois organisés dans plusieurs endroits différents</p>
      </div>
      <div class="col s12 m12 l4 xl4">
        <i class="large material-icons">format_list_numbered</i>
        <h5 class="center-align">Consulter les classements des tournois terminés</h5>
        <p class="left-align">Permet d'avoir le classement des joueurs qui ont participé aux différents tournois.</p>
      </div>
      <div class="col s12 m12 l4 xl4">
        <i class="large material-icons">assignment_ind</i>
        <h5 class="center-align">Suivre ses résultats</h5>
        <p class="left-align">Permet de suivre l'ensemble de ses résultats personnels aux différents tournois qui ont eu lieu</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  width : 200px;
  height : 200px;
}
h1,h3 {
  margin: 20px 0 40px;
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
i{
  color : rgb(19, 204, 90);
}
</style>
