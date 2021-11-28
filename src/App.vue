<template>
  <div class="app">
    <Navbar/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
import 'jquery/src/jquery.js';

</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";

</style>