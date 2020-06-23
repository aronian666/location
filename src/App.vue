<template>
  <div id="app">
    <div class="ui secondary inverted pointing menu container" v-if="user">
      <a class="active item">
        Resumen
      </a>
      <a class="item">
        Usuarios
      </a>
      <a class="item">
        Pacientes
      </a>
      <div class="right menu">
        <a @click="signOut" class="ui item">
          Logout
        </a>
      </div>
    </div>
    <router-view :current-user="user"/>
  </div>
</template>

<script>
import {auth} from 'firebase/app'
export default {
  name: 'App',
  props: {
    user: Object
  },
  methods: {
    signOut(){
      auth().signOut().then(()=>{
        location.reload()
      })
    }
  }
}

  
</script>

<style>
  #app{
    background-color: rgb(27, 28, 29);
  }
</style>
