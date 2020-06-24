<template>
  <div id="app">
    <div v-if="user" style="position:fixed;display:flex;flex-direction:column;top:0;bottom:0;left:0;width:200px;background:#1B1C1D;overflow-x:hidden;flex:1">
      <div class="ui borderless compact fluid inverted vertical menu">
        <router-link to="/" class="item" :class="{active: $route.name == 'home'}"><b>Inicio</b></router-link>
        <div class="item">
          <div class="header">Users</div>
          <div class="menu">
            <router-link :to="{name: 'users/new'}" :class="{active: $route.name == 'users/new'}" class="item">New<i class="ui icon user"></i></router-link>
            <router-link :to="{name: 'search'}" :class="{active: $route.name == 'search'}" class="item">Search<i class="ui icon search"></i></router-link>
          </div>
        </div>
        <div class="item">
          <div class="menu">
            <a class="item" @click="signOut">Cerrar sesion</a>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-left: 200px" >
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
  data(){
    return {
      search: ""
    }
  },
  directives: {
    focus: {
      inserted(el){
        el.focus()
      }
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
