<template>
  <div id="app">
    <Chat v-if="user"></Chat>
    <Login v-else></Login>
  </div>
</template>

<script>
import Chat from './components/Chat/Chat'
import Login from './components/Login/Login'
import firebase from 'firebase'
export default {
  data() {
    return {
      user: firebase.auth().currentUser
    }
  },
  name: 'App',
  components: {
    Chat, Login
  }
}
</script>

<style>

    * {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color:  #EA526F;
    }
    
</style>