<template>
  <div class="home">
    <Menu />
    <Footer />
  </div>
</template>

<script>
import Menu from '../components/Menu.vue'
import Footer from '../components/Footer.vue'
export default {
  name: 'HomeView',
  components: {
    Menu,
    Footer
  }
}
</script>
