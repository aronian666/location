<template>
    <div class="ui container form" style="color: #fafafa">
        <h2 class="ui header">Resumen diario</h2>
        <div class="field">
            <input type="date" v-model="date">
        </div>
        <div class="ui statistics">
            <div class="ui red statistic">
                <div class="value">
                    {{users.length}}
                </div>
                <div class="label">
                    Totales registrados
                </div>
            </div>
            <div class="ui yellow statistic">
                <div class="value">
                    {{ users.filter(user => user.created_by == currentUser.uid).length}}
                </div>
                <div class="label">
                    Mis usuarios registrados
                </div>
            </div>
        </div>
        <UserTable :users="users"></UserTable>
    </div>
</template>

<script>
import {database} from 'firebase/app'
import {range} from '../firebase'
import UserTable from '@/components/UserTable.vue'
//import {collection} from '../firebase'
export default {
    components: {
        UserTable
    },
    props: {
        currentUser: Object
    },
    data: function(){
        //const ga = new Date()
        //this.today = new Date(`${ga.getDay()}/${ga.getDate()}/${ga.getFullYear()}`)
        return {
            users: [],
            date: (new Date()).toISOString().slice(0, 10)
        }
    },
    watch: {
        async date(date){
            this.users = await this.getUsers(date)
        }
    },
    methods: {
        getUsers: async function(date){
            const day = new Date(date)
            const now = new Date(day.getTime() + 86400000)
            const raton = []
            const users = await range(database().ref('users'), 'created', day.getTime() - 18000000, now.getTime() - 18000000)
            if (users) {
                for (let id of Object.keys(users)){
                    raton.push({id: id, ...users[id]})
                }
                return raton
            }
            return []
        }
    },
    created: async function(){
        this.users = await this.getUsers(this.date)
        //this.users = await findBy(database().ref('users'), {created: this.today.getTime()})
        //this.users = await collection(database().ref('users'))
        //this.users = await where(database().ref('users'), 'email', 'arturotoll5@gmail.com')
        //this.users = Object.values(await range(database().ref('users'), 'created', this.today.getTime(), Date.now()))
        //console.log(this.users)
    },
}
</script>

<style>

</style>