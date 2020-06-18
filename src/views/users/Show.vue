<template>
  <section class="container ui list" v-if="currentUser">
      <div class="item"  v-for="property in properties" :key="property.property">
          <i class="icon" :class="property.icon" style="color: blue"></i>
          <div class="content">
              {{ currentUser[property.property] }}
          </div>
      </div>
      <GoogleMap :user="currentUser" :options="{direction: true}" />
  </section>
</template>

<script>
import {database} from 'firebase/app'
import 'firebase/database'
import GoogleMap from '@/components/Map.vue'

export default {
    props: {
        user: Object
    },
    components: {
        GoogleMap
    },
    data: function(){
        this.properties = [
            {name: 'Name', property: 'name', icon: 'user'},
            {name: '', property: 'phone', icon: 'phone volume'},
            {name: '', property: 'dni', icon: 'address card'},
            {name: '', property: 'email', icon: 'mail'}
        ]
        return {
            currentUser: this.user
        }
    },
    created: async function(){
        if (!this.currentUser){
            this.currentUser = (await database().ref(`/users/${this.$route.params.id}`).once('value')).val()
        }
    }
}
</script>

<style>

</style>