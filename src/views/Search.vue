<template>
  <section class="container">
    <nav>
      <input type="text" v-model="search"/>
    </nav>
    <div>
      <ol v-if="users.length > 0">
        <li v-for="user in users" :key="user.name">{{user.name}}</li>
      </ol>
      <div v-else>
        There isn't any user
      </div>
    </div>
  </section>
</template>

<script>
import { firestore } from 'firebase/app';
import 'firebase/firestore'
export default {
  name: "App",
  data: function(){
    let db = firestore()
    this.ref = {
      users: db.collection('users')
    }
    return {
      search: "",
      users: [],
      lastChange: Date.now()
      
    }
  },
  watch: {
    search: async function(search){
      let element = this;
      setTimeout(async function() {
        if (Date.now() - element.lastChange >= 0) {
          element.users = await element.getUsers(search)
        }
      }, 0);
      this.lastChange = Date.now();
    }
  },
  methods: {
    getUsers: async function(search){
      let users = []
      const end = search.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
      let ga = await (this.ref.users.where('name', '>=', search.toUpperCase()).where('name', '<', end.toLowerCase()).get())
      ga.forEach(user => {
        users.push(Object.assign({id: user.id}, user.data()))
      })
      return users
    }
  }
}
</script>

<style>

</style>

