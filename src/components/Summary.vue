<template>
    <div class="ui container" style="color: #fafafa">
        <h2 class="ui header inverted">Resumen diario</h2>
        <div class="ui statistics inverted">
            <div class="ui inverted red statistic">
                <div class="value">
                    {{users.length}}
                </div>
                <div class="label">
                    Totales registrados
                </div>
            </div>
            <div class="ui inverted yellow statistic">
                <div class="value">
                    {{ users.filter(user => user.created_by == currentUser.uid).length}}
                </div>
                <div class="label">
                    Mis usuarios registrados
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import {database} from 'firebase/app'
import {range} from '../firebase'
//import {collection} from '../firebase'
export default {
    props: {
        currentUser: Object
    },
    data: function(){
        const ga = new Date()
        this.today = new Date(`${ga.getDay()}/${ga.getDate()}/${ga.getFullYear()}`)
        return {
            users: []
        }
    },
    created: async function(){
        //this.users = await findBy(database().ref('users'), {created: this.today.getTime()})
        //this.users = await collection(database().ref('users'))
        //this.users = await where(database().ref('users'), 'email', 'arturotoll5@gmail.com')
        this.users = Object.values(await range(database().ref('users'), 'created', this.today.getTime(), Date.now()))
        //console.log(this.users)
    },
}
</script>

<style>

</style>