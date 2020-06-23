<template>
  <section class="ui container">
    <table class="ui very basic celled table" v-if="users.length > 0">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido Paterno</th>
          <th>Apellido Materno</th>
          <th>DNI</th>
          <th>Celular</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users.search(search)" :key="user.id">
          <td>
            <h4 class="ui image header">
              <img :src="photos[Math.floor(Math.random() * photos.length)]" class="ui mini rounded image">
              <div class="content">
                {{user.name}}
                <div class="sub header">{{user.role}}
              </div>
            </div>
          </h4></td>
          <td>
            {{user.last_name1}}
          </td>
          <td>
            {{user.last_name2}}
          </td>
          <td>
            {{user.dni}}
          </td>
          <td>
            {{user.cellphone}}
          </td>
          <td>
            {{user.email}}
          </td>
          <td>
            <router-link :to="{ name: 'ShowUser', params: { id: user.id }}" class="ui positive basic button">Ver</router-link>
            
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { database } from 'firebase/app';
import 'firebase/database'
export default {
  name: "App",
  data: function(){
    let db = database()
    this.ref = {
      users: db.ref('users')
    }
    this.properties = [
      'name',
      'last_name1',
      'last_name2',
      'dni',
      'cellphone',
      'email',
    ]
    this.photos = [
      'https://semantic-ui.com/images/avatar2/large/kristy.png',
      'https://semantic-ui.com/images/avatar2/large/matthew.png',
      'https://semantic-ui.com/images/avatar2/large/molly.png',
      'https://semantic-ui.com/images/avatar/large/elliot.jpg'
    ]
    return {
      users: [],
      search: this.$route.params.search,
      char: this.$route.params.search[0],
    }
  },
  watch: {
    char: function(char){
      if (char[0]){
        this.getUsers(char)
      }
    },
    search: function(search){
      this.validateSearch(search)
    },
    $route(to){
      this.search = to.params.search
    }
  },
  created: function(){
    this.getUsers(this.char)
  },
  methods: {
    validateSearch: function(search){
      console.log(search)
      if (search.length == 0) {
        this.users = []
        this.char = ""
        return
      }
      this.char = search[0]
    },
    getUsers: function(search){
      //search = search
      
      //const end = search.toUpperCase() + 'Z'
      //console.log(search)
      let users = {}
      const end = search.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
      for (let i = 0; i < this.properties.length; i++){
        this.ref.users.orderByChild(this.properties[i]).startAt(search.toLowerCase()).endAt(end.toLowerCase()).once('value').then(snap => {
          Object.values(Object.assign(users, snap.val()))
          let ga = []
          Object.keys(users).forEach(id => {
            ga.push(Object.assign({id}, users[id]))
          })
          this.users = ga
        })
        this.ref.users.orderByChild(this.properties[i]).startAt(search.toUpperCase()).endAt(end.toUpperCase()).once('value').then(snap => {
          Object.values(Object.assign(users, snap.val()))
          let ga = []
          Object.keys(users).forEach(id => {
            ga.push(Object.assign({id}, users[id]))
          })
          this.users = ga
        })
      }
      
      //return users
      /*let users = []
      
      let ga = await (this.ref.users.where('name', '>=', search.toUpperCase()).where('name', '<', end.toLowerCase()).get())
      ga.forEach(user => {
        users.push(Object.assign({id: user.id}, user.data()))
      })
      return users*/
    }
  }
}
</script>

<style>

</style>
