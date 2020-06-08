<template>
  <div>
      <table class="ui table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Las name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.last_name }}</td>
            <td><button @click="locate(user)">Ubicar</button></td>
            <td><button @click="road(user)">Trazar camino</button></td>
          </tr>
        </tbody>
      </table>
      <div id='map' style="height: 50vh; width: 50vw"></div>
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
        users: null,
        location: null
      }
    },
    watch: {
      location: function(location){
        console.log(location)
      }
    },
    created: function(){
      let users = firebase.database().ref('users')
      let element = this
      users.once('value').then(response => {
        let array = response.val().filter(x => x != undefined)
        element.users = array
      })
      this.initMap()
    },
    methods: {
      initMap: async function(){
        const loader = new Loader('AIzaSyC090yeXmE6adzPnrEDPhG-vQ2bPdbdt4s');
        this.google = await loader.load();
        this.directionsRenderer = new this.google.maps.DirectionsRenderer
        this.directionsService = new this.google.maps.DirectionsService
        this.map = new this.google.maps.Map(document.getElementById("map"), {
          center: { lat: -15.8427, lng: -70.0219 },
          zoom: 17
        });
        
      },
      getLocation: function(user){
        let location = firebase.database().ref(`/locations/${user.id}`)
        if (this.marker){
          this.marker.setMap(null)
        }
        if (this.directionsRenderer){
          this.directionsRenderer.setMap(null)
        }
        return location.once('value')
      },
      locate: async function(user){
        this.location = (await this.getLocation(user)).val()
        this.map.setCenter(this.location)
        this.marker = new this.google.maps.Marker({
          position: this.location,
          map: this.map,
          title: user.name
        })
      },
      road: async function (user) {
        this.location = (await this.getLocation(user)).val()
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
<style>
</style>
