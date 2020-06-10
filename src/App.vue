<template>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr);" class="main">
    <div style="grid-column: 1/3">
      <table class="ui table">
        <thead>
          <tr>
            <th><input autocomplete="off" v-model="search.name" type="text" placeholder="Name"></th>
            <th><input autocomplete="off" v-model="search.last_name" type="text" placeholder="Last Name"></th>
            <th><input autocomplete="off" v-model="search.dni" type="text" placeholder="DNI"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, id) in users.search(search)" :key="id">
            <td>{{ user.name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.dni }}</td>
            <td><button @click="locate(user)">Ubicar</button></td>
            <td><button @click="road(user)">Trazar camino</button></td>
          </tr>
        </tbody>
      </table>
      <div id='map' style="height: 50vh; width: 100%"></div>
    </div>
    <div style="grid-column: 3">
      <div>
        <label for="user[name]">Name</label>
        <input v-model="user.name" autocomplete="off" type="text" name="user[name]" id="user[name]">
      </div>
      <div>
        <label for="user[last_name]">Last Name</label>
        <input v-model="user.last_name" autocomplete="off" type="text" name="user[last_name]" id="user[last_name]">
      </div>
      <div>
        <label for="user[dni]">DNI</label>
        <input v-model="user.dni" autocomplete="off" type="text" name="user[dni]" id="user[dni]">
      </div>
      <div>
        <label for="user[cellphone]">Cellphone</label>
        <input v-model="user.cellphone" autocomplete="off" type="number" name="user[cellphone]" id="user[cellphone]">
      </div>
      <div>
        <label for="user[email]">Email</label>
        <input v-model="user.email" autocomplete="off" type="text" name="user[email]" id="user[email]">
      </div>
      <button @click="addUser">Add</button>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/database'
  import {Loader} from 'google-maps';
  // or const {Loader} = require('google-maps'); without typescript
  
  //const options: LoaderOptions = {/* todo */};
  
  /*const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8,
  });
  */
  
  export default {
    name: 'App',
    data: function(){
      return {
        users: [],
        location: null,
        user: {},
        search: {}
      }
    },
    created: function(){
      let users = firebase.database().ref('users')
      let element = this
      users.on('value', response => {
        element.users = Object.values(response.val())
      })
      if (!this.map){
        this.initMap()
      }
      
    },
    methods: {
      addUser: function(){
        if (!this.user.location){
          alert('Set a user location!')
          return
        }
        let newUser = firebase.database().ref('users').push()
        newUser.set(this.user)
        this.user = {}
        this.setNull()
      },
      initMap: async function(){
        const loader = new Loader('AIzaSyC090yeXmE6adzPnrEDPhG-vQ2bPdbdt4s');
        this.google = await loader.load();
        this.directionsRenderer = new this.google.maps.DirectionsRenderer
        this.directionsService = new this.google.maps.DirectionsService
        this.map = new this.google.maps.Map(document.getElementById("map"), {
          center: { lat: -15.8427, lng: -70.0219 },
          zoom: 17
        });
        this.map.addListener('click', event => {
          this.user.location = {lat: event.latLng.lat(), lng: event.latLng.lng()}
          this.setNull()
          this.marker = new this.google.maps.Marker({
            position: this.user.location,
            map: this.map,
          })
        })
        
      },
      setNull: function(){
        if (this.marker){
          this.marker.setMap(null)
        }
        if (this.directionsRenderer){
          this.directionsRenderer.setMap(null)
        }
      },
      /*getLocation: function(user){
        let location = firebase.database().ref(`/locations/${user.id}`)
        if (this.marker){
          this.marker.setMap(null)
        }
        if (this.directionsRenderer){
          this.directionsRenderer.setMap(null)
        }
        return location.once('value')
      },*/
      locate: async function(user){
        this.setNull()
        this.location = user.location
        this.map.setCenter(this.location)
        this.marker = new this.google.maps.Marker({
          position: this.location,
          map: this.map,
          title: user.name
        })
        
      },
      road: async function (user) {
        this.setNull()
        this.location = user.location
        this.directionsRenderer.setMap(this.map);
        var directionsRenderer = this.directionsRenderer
        this.directionsService.route({
          origin: { lat: -15.8427, lng: -70.0219 },  // Haight.
          destination: this.location,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status == 'OK') {
            directionsRenderer.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
    }
  }
</script>
<style scoped>
  .main > div {
    padding: 1em;
  }
</style>
