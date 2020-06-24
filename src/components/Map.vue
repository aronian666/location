<template>
  <div id="map"></div>
</template>

<script>
import {Loader} from 'google-maps';
export default {
    name: 'GoogleMaps',
    props: {
        user: Object,
        search: String,
        options: {
            type: Object,
            default: function(){
                return {}
            }
        }
    },
    created: async function(){
        const loader = new Loader('AIzaSyDrIqo0eM9GvFIn7Zbe3sgkXAG2g6706qs');
        if (!this.google){
            this.google = await loader.load();
        }
        
        
        this.directionsRenderer = new this.google.maps.DirectionsRenderer
        this.directionsService = new this.google.maps.DirectionsService
        this.map = new this.google.maps.Map(document.getElementById("map"), {
            center: { lat: -15.8427, lng: -70.0219 },
            zoom: 15
        });
        if (this.options.marker){
            this.map.addListener('click', event => {
                this.user.location = {lat: event.latLng.lat(), lng: event.latLng.lng()}
                this.setNull()
                this.marker = new this.google.maps.Marker({
                    position: this.user.location,
                    map: this.map,
                })
            })
        }
        if (this.options.direction){
            this.road(this.user)
        }
        
        
    },
    methods: {
        setNull: function(){
            if (this.marker){
                this.marker.setMap(null)
            }  
        },
        road: async function (user) {
            this.setNull()
            this.directionsRenderer.setMap(this.map);
            var directionsRenderer = this.directionsRenderer
            this.directionsService.route({
            origin: { lat: -15.8427, lng: -70.0219 },  // Haight.
            destination: user.location,
            travelMode: 'DRIVING'
            }, function(response, status) {
            if (status == 'OK') {
                directionsRenderer.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
            });
        }
    },
    
    
}
</script>

<style scoped>
    #map{
        width: 100%;
        height: 90%;
        min-height: 300px;
    }
</style>