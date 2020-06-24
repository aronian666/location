<template>
    <section class="ui container">
        <div class="ui pointing menu">
            <div class="item">
                <div class="ui transparent icon input">
                    <input type="text" placeholder="Search..." v-model="search">
                    <i class="search link icon"></i>
                </div>
            </div>
        </div>
        <div v-if="search.length == 0">
            <h2>Ultimas busquedas</h2>
            <div class="ui items" >
                <div class="item" v-for="user in users" :key="user.id">
                    <a class="ui tiny image">
                        <img :src="photos[Math.floor(Math.random() * photos.length)]">
                    </a>
                    <div class="middle aligned content">
                        <div class="header">
                            <i class="user icon"></i>
                            {{user.name}} {{ user.last_name1 }} {{ user.last_name2}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <router-view :searched="searched" :search="search" :current-user="currentUser" v-if="search.length > 0"></router-view>
    </section>
</template>

<script>
import { database } from 'firebase/app'
//import {database} from 'firebase/app'

export default {
    name: "Search",
    props: {
        currentUser: Object
    },
    data: function(){
        this.photos = [
            'https://semantic-ui.com/images/avatar2/large/kristy.png',
            'https://semantic-ui.com/images/avatar2/large/matthew.png',
            'https://semantic-ui.com/images/avatar2/large/molly.png',
            'https://semantic-ui.com/images/avatar/large/elliot.jpg'
        ]
        return {
            users: [],
            search: window.location.href.split('/')[4] ? window.location.href.split('/')[4] : "",
            searched: localStorage.getItem(this.currentUser.uid) ? localStorage.getItem(this.currentUser.uid).split(',') : [] 
        }
    },
    watch: {
        search(search){
            
            if (search && search.length > 0){
                console.log('tengo algo')
                this.$router.push({name: 'search/:search', params: {search}})
            } else {
                console.log('no tengo nada')
                this.$router.push({name: 'search'})
            }
            
        },
        searched: async function(searched){
            localStorage.setItem(this.currentUser.uid, [...new Set(searched)])
            this.users = await this.getUsers()
        },
    },
    created: async function(){
        this.users = await this.getUsers()
    },
    methods: {
        getUsers: async function(){
            let users = []
            for (let user of this.searched){
                users.push((await database().ref('users').child(user).once('value')).val())
            }
            return users
        }
    }
}
</script>

<style>

</style>