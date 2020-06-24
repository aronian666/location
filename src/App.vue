<template>
  <div id="app">
    <div v-if="user" class="ui menu container">
      <router-link to="/" class="item" :class="{active: $route.name == 'home'}">Inicio</router-link>
      <router-link :to="{name: 'users/new'}" :class="{active: $route.name == 'users/new'}" class="item">Nuevo Usuario</router-link>
      <div class="right menu">
        <a class="item" @click="signOut">Cerrar sesion</a>
      </div>
    </div>
    <div>
      <router-view :current-user="user"/>
    </div>
    
  </div>
</template>

<script>
import {auth} from 'firebase/app'
export default {
  name: 'App',
  props: {
    user: Object
  },
  created: function(){
    if (!this.user){
      this.$router.push({path: '/'})
    }
  },
  methods: {
    signOut(){
      auth().signOut().then(()=>{
        location.reload()
      })
    },

  }
}

  
</script>

<style>
</style>
