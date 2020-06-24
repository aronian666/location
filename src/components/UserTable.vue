<template>
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
        <tr v-for="user in users" :key="user.id">
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
            <a @click="toUser(user)" class="ui positive basic button">Ver</a>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
    props: {
        users: Array
    },
    data(){
        this.photos = [
            'https://semantic-ui.com/images/avatar2/large/kristy.png',
            'https://semantic-ui.com/images/avatar2/large/matthew.png',
            'https://semantic-ui.com/images/avatar2/large/molly.png',
            'https://semantic-ui.com/images/avatar/large/elliot.jpg'
        ]
        return {}
    },
    methods: {
        toUser(user){
            this.searched.push(user.id)
            const element = this
            setTimeout(function(){
                element.$router.push({ name: 'users/:id', params: { id: user.id }})
            }, 1)    
        }
    }
}
</script>

<style>

</style>