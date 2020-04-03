<template>
  <div class="home">
      <Navbar/>
      <LoginUser msg="Connexion"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginUser from '@/components/LoginUser.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Login',
  components: {
    LoginUser,
    Navbar
  }
}
</script>

