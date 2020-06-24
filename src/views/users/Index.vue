<template>
  <div>
    <UserTable :users="users.search(search)"></UserTable>
  </div>
</template>

<script>
import { database } from 'firebase/app';
import UserTable from '@/components/UserTable.vue'
export default {
  components: {
    UserTable
  },
  name: "Users",
  props: {
    search: String,
    currentUser: Object,
    searched: Array
  },
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
    
    return {
      users: [],
      char: this.search[0],
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
  },
  created: function(){
    this.getUsers(this.char)
  },
  methods: {
    validateSearch: function(search){
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
    },
    
  }
}
</script>

<style>

</style>
