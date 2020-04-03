<template>
  <div class="home">
    <Navbar />
    <HelloWorld msg="Bienvenue"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Navbar
  }, 
  created(){
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
