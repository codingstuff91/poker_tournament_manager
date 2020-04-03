<template>
  <div class="home">
    <Navbar />
    <SignupUser msg="Enregistrement"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignupUser from '@/components/SignupUser.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Register',
  components: {
    SignupUser,
    Navbar
  }
}
</script>
